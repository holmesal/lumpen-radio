import React from 'react-native';
import Video from 'react-native-video';

import styles from '../styles';

let {
  Image,
  View,
  AppStateIOS
} = React;

export default React.createClass({
  getInitialState() {
    return {
      rate: 1,
      muted: true,
      resizeMode: 'cover',
      repeat: true
    }
  },

  componentDidMount() {
    AppStateIOS.addEventListener('change', this._onAppStateChange);
  },

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._onAppStateChange);
  },

  render() {
    return (
      <Video source={{uri: 'turntable-loop-1920x500-h264-512kbps-h264'}}
        style={styles.backgroundVideo}
        rate={this.state.rate}
        muted={this.state.muted}
        resizeMode={this.state.resizeMode}
        repeat={this.state.repeat} />
    )
  },

  _onAppStateChange(currentAppState) {
    switch (currentAppState) {
      case 'active':
        this.setState({ repeat: true });
        break;
      default:
        this.setState({ repeat: false });
        break;
    }
  }
});
