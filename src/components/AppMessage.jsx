import React from 'react-native';

import styles from '../styles';

let {
  NetInfo,
  Text
} = React;

let AppMessage = React.createClass({
  getInitialState() {
    return { isConnected: null };
  },
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this._onConnectivityChange
    );
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ isConnected });
    });
  },
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._onConnectivityChange
    );
  },
  _onConnectivityChange(isConnected) {
    this.setState({ isConnected });
  },
  render() {
    let message;
    if (this.state.isConnected) {
      if (this.props.status === 'PLAYING') {
        message = 'Now playing commercial-free...'
      } else {
        message = 'Tap the above icon to start playing.'
      }
    } else {
      message = 'Connect to the Internet to listen.'
    }
    return (
      <Text style={[styles.appMessage, styles.appSubMessage]}>{message}</Text>
    );
  }
});

export default AppMessage;
