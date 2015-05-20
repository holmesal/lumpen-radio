//
//  AudioManager.h
//  ReactNativeEs6Reflux
//
//  Created by Josh Habdas on 5/9/15.
//  Copyright (c) 2015 Public Media Institute. All rights reserved.
//

#import "RCTBridgeModule.h"
#import "STKAudioPlayer.h"

@interface AudioManager : NSObject <RCTBridgeModule, STKAudioPlayerDelegate>

@end
