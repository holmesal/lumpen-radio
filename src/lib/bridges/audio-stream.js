Ximport React from "react-native";

import { AudioBridge } from "NativeModules";

let {
  NetInfo, AlertIOS
} = React;

var start = function() {
  console.log('starting audio ...');
  AudioBridge.play();
};

var stop = function() {
  console.log('stopping audio ...');
  AudioBridge.stop();
};

exports.play = function() {
  NetInfo.reachabilityIOS.fetch().done(function(reach) {
    if (reach == 'wifi') {
      AlertIOS.alert('Mobile Internet', 'You are not connected to Wi-Fi. Would you like to continue using your wireless provider?', [{
        text: 'Start radio',
        onPress: function() {
          start();
        }
      }, {
        text: 'Quit',
        onPress: function() {
          stop();
        }
      }]);
    } else {
      start();
    }
  });
};

exports.stop = stop;

exports.getStatus = function(callback) {
  console.log('getting status');
  return AudioBridge.getStatus(callback);
};
