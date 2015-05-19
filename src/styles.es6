import React from 'react-native';

let { StyleSheet } = React;

let Styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appLogo: {
    width: 250,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 14,
    opacity: 0.7,
  },

  appMessage: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
    padding: 5,
  },

  appSubMessage: {
    fontSize: 18,
  },

  connectionMessage: {
    backgroundColor: '#3b7ec1',
    opacity: 0.7
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

export default Styles;
