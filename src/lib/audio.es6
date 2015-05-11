import React from 'react-native';
import { AudioManager } from 'NativeModules';

let {
  NetInfo, AlertIOS
} = React;

export class AudioPlayer {
  static start() {
    NetInfo.reachabilityIOS.fetch().done( (reach) => {
      if (reach !== 'wifi') {
        AlertIOS.alert(
          'Data Usage Rates Apply',
          'You are not connected to Wi-Fi. Would you like to use your wireless provider instead?',
          [
            {text: 'Okay', onPress: () => AudioPlayer.play()},
            {text: 'Nope!', onPress: () => AudioPlayer.stop()}
          ]
        );
      } else {
        AudioPlayer.play();
      }
    });
  }
  static play() {
    console.log('playing audio ...');
    AudioManager.play();
  }
  static stop() {
    console.log('stopping audio ...');
    AudioManager.stop();
  }
  static pause() {
    console.log('pausing audio ...');
    AudioManager.pause();
  }
  static resume() {
    console.log('resuming audio ...');
    AudioManager.resume();
  }
  static getStatus(callback) {
    console.log('getting status ...');
    if (callback && typeof callback === 'function') {
      return AudioManager.getStatus(callback);
    }
  }
}
