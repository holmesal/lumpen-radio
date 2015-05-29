import React from 'react-native';
import Reflux from 'reflux';

import Actions from '../actions';
import Messages from '../stores/messages';
import styles from '../styles';

import { AudioPlayer } from '../lib/audio';
import Video from 'react-native-video';

import ConnectionStatus from './ConnectionStatus'
import Background from './Background'

let {
  View,
  Text,
  Image,
  StatusBarIOS,
  TouchableOpacity,
  DeviceEventEmitter
} = React;

export default React.createClass({
  mixins: [Reflux.connect(Messages, 'message')],

  getInitialState() {
    return { status: 'STOPPED' };
  },

  componentDidMount() {
    // Get the initial message from the store
    // Actions.updateMessage();
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', (evt) => this.setState(evt)
    );
    AudioPlayer.getStatus((error, status) => {
      (error) ? console.log(error) : this.setState(status)
    });
  },

  render() {
    return (
      <View style={styles.appContainer}>

        <Background status={this.state.status} />

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
    // Actions.updateMessage();
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
