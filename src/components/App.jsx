import tweenState from 'react-tween-state';
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
  mixins: [Reflux.connect(Messages, 'message'), tweenState.Mixin],

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
    this.tweenState('opacity', {
      beginValue: 0,
      endValue: 1,
      duration: 1000
    });
  },

  render() {
    let transitionStyle = {opacity: this.getTweeningValue('opacity')};
    return (
      <View style={styles.appContainer}>

        <Background status={this.state.status} />

        <Text style={styles.appMessage}>
          LUMPEN RADIO
        </Text>
        <Text style={[styles.appMessage, styles.appSubMessage]}>
          WLPN 105.5 FM Chicago
        </Text>

        <TouchableOpacity
          onPress={Actions.updateMessage, this._onPressLogo}
          onLongPress={this._onLongPressLogo}>
          <Image
            style={styles.appLogo}
            source={require('image!RadioButton')} />
        </TouchableOpacity>

        <View style={transitionStyle}>
          <ConnectionStatus status={this.state.status} />
        </View>
      </View>
    );
  },

  componentWillUnmount() {
    this.subscription.remove();
  },

  _onLongPressLogo() {
    AudioPlayer.play();
  },

  _onPressLogo() {
    // Actions.updateMessage();
    switch (this.state.status) {
      case 'PLAYING':
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
      case 'STOPPED':
        this.setState({
          status: 'BUFFERING'
        });
        AudioPlayer.play();
        break;
      case 'BUFFERING':
        this.setState({
          status: 'STOPPED'
        });
        AudioPlayer.stop();
        break;
    }
  }
});
