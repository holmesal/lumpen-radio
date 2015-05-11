import React from "react-native";

let {StyleSheet} = React;

let Styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },

  appLogo: {
    width: 250,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 14
  },

  appMessage: {
    fontSize: 20,
    color: "black",
    fontFamily: "Avenir-Medium",
    alignSelf: "center"
  },

  appSubMessage: {
    fontSize: 14,
    opacity: 0.7
  }
});

export default Styles;
