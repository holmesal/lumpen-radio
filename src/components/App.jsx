import React from 'react-native';
import Reflux from 'reflux';

import Actions from '../actions';
import Messages from '../stores/messages';
import styles from '../styles';

import { AudioPlayer } from '../lib/audio';
import Video from 'react-native-video';

import ConnectionStatus from './ConnectionStatus'

let {
  View,
  Text,
  Image,
  StatusBarIOS,
  TouchableOpacity,
  DeviceEventEmitter
} = React;

let App = React.createClass({
  mixins: [Reflux.connect(Messages, 'message')],

  getInitialState() {
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', (evt) => this.setState(evt)
    );
    AudioPlayer.getStatus((error, status) => {
      (error) ? console.log(error) : this.setState(status)
    });
    return { status: 'STOPPED' };
  },

  componentDidMount() {
    // Get the initial message from the store
    // Actions.updateMessage();
  },

  render() {
    return (
      <View style={styles.appContainer}>
        <Video source={{uri: 'turntable-loop-1920x500-h264-512kbps-h264'}}
          style={styles.backgroundVideo}
          rate={1} // TODO: use this.state.rate etc for the rest
          muted={true}
          resizeMode='cover'
          repeat={true} />

        <Text style={styles.appMessage}>
          Lumpen Radio
        </Text>
        <Text style={[styles.appMessage, styles.appSubMessage]}>
          WLPN 105.5 FM Chicago
        </Text>

        <TouchableOpacity
          onPress={Actions.updateMessage, this._onLogoClick}>
          <Image
            style={styles.appLogo}
            source={require('image!RadioIcon')} />
        </TouchableOpacity>

        <ConnectionStatus status={this.state.status} />
      </View>
    );
  },

  componentWillUnmount() {
    this.subscription.remove();
  },

  _onLogoClick() {
    Actions.updateMessage();
    switch (this.state.status) {
      case 'STOPPED':
        this.setState({
          status: 'LOADING'
        });
        AudioPlayer.play();
        break;
      case 'LOADING', 'PLAYING':
        this.setState({
          status: 'PAUSED'
        });
        AudioPlayer.pause();
        break;
      case 'PAUSED':
        this.setState({
          status: 'PLAYING'
        });
        AudioPlayer.resume();
        break;
    }
  }
});

export default App;
