//  AudioManager.m

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "AudioManager.h"
#import "Constants.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioManager

@synthesize bridge = _bridge;

static STKAudioPlayer *audioPlayer;
static BOOL isPlayingWithOthers;

- (AudioManager *)init {
  [self setSharedAudioSessionCategory];
  [self registerAudioInterruptionNotifications];
  return self;
}

- (void)dealloc
{
  [self unregisterAudioInterruptionNotifications];
}

#pragma mark - RCTBridgeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(play) {
  if (audioPlayer != nil) {
    [audioPlayer stop];
  }
  audioPlayer = [[STKAudioPlayer alloc] initWithOptions:(STKAudioPlayerOptions){ .readBufferSize = 20 }];

  [audioPlayer setDelegate:self];
  [audioPlayer play:LPN_AUDIO_STREAM_URL];
}

RCT_EXPORT_METHOD(pause) {
  if (audioPlayer != nil) {
    [audioPlayer pause];
  }
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"PAUSED"}];
}

RCT_EXPORT_METHOD(resume) {
  if (audioPlayer != nil) {
    [audioPlayer resume];
  }
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"PLAYING"}];
}

RCT_EXPORT_METHOD(stop) {
  if (audioPlayer != nil) {
    [audioPlayer stop];
    [audioPlayer setDelegate:nil];
  }
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"STOPPED"}];
}

RCT_EXPORT_METHOD(getStatus: (RCTResponseSenderBlock) callback) {
  if (audioPlayer == nil) {
    callback(@[[NSNull null], @{@"status" : @"STOPPED"}]);
  } else if ([audioPlayer state] == STKAudioPlayerStatePlaying) {
    callback(@[[NSNull null], @{@"status" : @"PLAYING"}]);
  } else {
    callback(@[[NSNull null], @{@"status" : @"STOPPED"}]);
  }
}

#pragma mark - STKAudioPlayer

- (void)audioPlayer:(STKAudioPlayer *)audioPlayer didStartPlayingQueueItemId:(NSObject *)queueItemId {
  NSLog(@"AudioPlayer is playing");
}

- (void)audioPlayer:(STKAudioPlayer *)audioPlayer didFinishPlayingQueueItemId:(NSObject *)queueItemId withReason:(STKAudioPlayerStopReason)stopReason andProgress:(double)progress andDuration:(double)duration {
  NSLog(@"AudioPlayer has stopped");
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"STOPPED"}];
}

- (void)audioPlayer:(STKAudioPlayer *)audioPlayer didFinishBufferingSourceWithQueueItemId:(NSObject *)queueItemId {
  NSLog(@"AudioPlayer finished buffering");
}

- (void)audioPlayer:(STKAudioPlayer *)audioPlayer unexpectedError:(STKAudioPlayerErrorCode)errorCode {
  NSLog(@"AudioPlayer unecpected Error with code %d", errorCode);
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"STOPPED"}];
}

- (void)audioPlayer:(STKAudioPlayer *)audioPlayer stateChanged:(STKAudioPlayerState)state previousState:(STKAudioPlayerState)previousState {
  NSLog(@"AudioPlayer state has changed");
  if (state == STKAudioPlayerStatePlaying) {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"PLAYING"}];
  } else if (state == STKAudioPlayerStateStopped) {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"STOPPED"}];
  } else if (state == STKAudioPlayerStateBuffering) {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent" body:@{@"status" : @"LOADING"}];
  }
}

#pragma mark - AVAudioSession

- (void)setSharedAudioSessionCategory
{
  NSError *error;
  
  // Create shared session and set audio session category for background playback
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:&error];
  
  if (error) {
    NSLog(@"Could not initialize AVAudioSession");
  }
}

- (void)registerAudioInterruptionNotifications
{
  // Register for audio interrupt notifications
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(onAudioInterruption:)
                                               name:AVAudioSessionInterruptionNotification
                                             object:nil];
  // Register for route change notifications
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(onRouteChangeInterruption:)
                                               name:AVAudioSessionRouteChangeNotification
                                             object:nil];
}

- (void)unregisterAudioInterruptionNotifications
{
  [[NSNotificationCenter defaultCenter] removeObserver:self name:AVAudioSessionRouteChangeNotification object:nil];
  [[NSNotificationCenter defaultCenter] removeObserver:self name:AVAudioSessionInterruptionNotification object:nil];
}

- (void)onAudioInterruption:(NSNotification *)notification
{
  // Get the user info dictionary
  NSDictionary *interruptionDict = notification.userInfo;
  
  // Get the AVAudioSessionInterruptionTypeKey enum from the dictionary
  NSInteger interuptionType = [[interruptionDict valueForKey:AVAudioSessionInterruptionTypeKey] integerValue];
  
  // Decide what to do based on interruption type
  switch (interuptionType)
  {
    case AVAudioSessionInterruptionTypeBegan:
      NSLog(@"Audio Session Interruption case started.");
      [self pause];
      break;
      
    case AVAudioSessionInterruptionTypeEnded:
      NSLog(@"Audio Session Interruption case ended.");
      isPlayingWithOthers = [[AVAudioSession sharedInstance] isOtherAudioPlaying];
      (isPlayingWithOthers) ? [self stop] : [self resume]; // TODO: Restart stream for longer interruptions (e.g. phone call)
      break;
      
    default:
      NSLog(@"Audio Session Interruption Notification case default.");
      break;
  }
}

- (void)onRouteChangeInterruption:(NSNotification*)notification {
  
  NSDictionary *interruptionDict = notification.userInfo;
  
  NSInteger routeChangeReason = [[interruptionDict valueForKey:AVAudioSessionRouteChangeReasonKey] integerValue];
  
  switch (routeChangeReason) {
    case AVAudioSessionRouteChangeReasonUnknown:
      NSLog(@"routeChangeReason : AVAudioSessionRouteChangeReasonUnknown");
      break;
      
    case AVAudioSessionRouteChangeReasonNewDeviceAvailable:
      // a headset was added or removed
      NSLog(@"routeChangeReason : AVAudioSessionRouteChangeReasonNewDeviceAvailable");
      break;
      
    case AVAudioSessionRouteChangeReasonOldDeviceUnavailable:
      // a headset was added or removed
      [self stop];
      break;
      
    case AVAudioSessionRouteChangeReasonCategoryChange:
      // called at start - also when other audio wants to play
      NSLog(@"routeChangeReason : AVAudioSessionRouteChangeReasonCategoryChange"); //AVAudioSessionRouteChangeReasonCategoryChange
      break;
      
    case AVAudioSessionRouteChangeReasonOverride:
      NSLog(@"routeChangeReason : AVAudioSessionRouteChangeReasonOverride");
      break;
      
    case AVAudioSessionRouteChangeReasonWakeFromSleep:
      NSLog(@"routeChangeReason : AVAudioSessionRouteChangeReasonWakeFromSleep");
      break;
      
    case AVAudioSessionRouteChangeReasonNoSuitableRouteForCategory:
      NSLog(@"routeChangeReason : AVAudioSessionRouteChangeReasonNoSuitableRouteForCategory");
      break;
  }
}

@end
