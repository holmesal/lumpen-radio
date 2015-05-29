import React from 'react-native';

import styles from '../styles';

let {
  NetInfo,
  Text
} = React;

export default React.createClass({
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
      switch (this.props.status) {
        case 'PLAYING':
          message = 'Now playing commercial-free!'
          break;
        default:
          message = 'Tap above to tune in.'
          break;
      }
    } else {
      message = 'Connect to the Internet to listen.'
    }
    return (
      <Text style={[styles.appMessage, styles.appSubMessage, styles.connectionMessage]}>{message}</Text>
    );
  }
});
