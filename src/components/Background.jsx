import React from 'react-native';

import Video from 'react-native-video';

import styles from '../styles';

let {
  Image
} = React;

let Background = React.createClass({
  getInitialState() {
    return {
      rate: 1,
      muted: true,
      resizeMode: 'cover',
      repeat: true
    }
  },

  render() {
    if (this.props.status === 'PLAYING') {
      return (
        <Video source={{uri: 'turntable-loop-1920x500-h264-512kbps-h264'}}
          style={styles.backgroundVideo}
          rate={this.state.rate}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          repeat={this.state.repeat} />
      )
    } else {
      return (
        <Image
          style={styles.backgroundStill}
          source={require('image!VideoStill')} />
      )
    }
  }
});

export default Background;
