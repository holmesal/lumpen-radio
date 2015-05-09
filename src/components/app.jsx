import React from "react-native";
import Reflux from "reflux";

import Actions from "../actions";
import Messages from "../stores/messages";

import styles from "../styles";

import { AudioManager } from "NativeModules";

let {
  View,
  Text,
  Image,
  StatusBarIOS,
  TouchableOpacity,
  DeviceEventEmitter
} = React;

let App = React.createClass({
  mixins: [Reflux.connect(Messages, "message")],

  getInitialState() {
    this.subscription = DeviceEventEmitter.addListener(
      'AudioBridgeEvent', (event) => this.setState(event)
    );
    AudioManager.getStatus((error, status) => {
      console.log(error);
      this.setState(status);
    });
    return { status: 'STOPPED' };
  },

  componentDidMount() {
    // Do stuff when the App top-level component is ready,
    // such as change the color of the iOS status bar:
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);

    // Get the initial message from the store
    Actions.updateMessage();

    // Play Lumpen.fm using StreamingKit Native Module
    if (this.state.status == 'STOPPED') {
      this.setState({
        status: 'LOADING'
      });
      AudioManager.play();
    } else {
      this.setState({
        status: 'STOPPED'
      });
      AudioManager.stop();
    }
  },

  render() {
    // Render the top-level element that will contain the complete UI
    // of your application. You may also choose to use this element
    // as the single source of data, that is then passed down to
    // child components.

    return (
      <View style={styles.appContainer}>
        <Text style={[styles.appMessage, styles.appSubMessage]}>
          Tap the React logo to change the message!
        </Text>

        <TouchableOpacity
          onPress={Actions.updateMessage}>
          <Image
            style={styles.appLogo}
            source={{uri: "http://facebook.github.io/react/img/logo_og.png"}}/>
        </TouchableOpacity>

        <Text style={styles.appMessage}>{this.state.message}</Text>
        <Text style={[styles.appMessage, styles.appSubMessage]}>
          Edit me in: src/components/app.jsx
        </Text>
      </View>
    );
  },

  componentWillUnmount() {
    this.subscription.remove();
  }
});

export default App;
