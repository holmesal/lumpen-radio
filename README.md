# WLPN 105.5 FM - Lumpen Radio Chicago

The [Lumpen Radio](http://lumpenradio.com) App is here. Almost...

![App screenshot](https://github.com/jhabdas/lumpen-radio/blob/master/screenshot.png)

## Features

- Streams Lumpen Radio over HTTP
- Pressing button starts/pauses stream
- Button long-press restarts stream
- Shows connection status in app
- Provides instruction for error cases
- Indicates when stream is buffering
- Resumes playback after interruption
- Stops playback when headset unplugged
- Plays video loop in background
- 20s buffer to help support poor connections

## Todo

- [x] Add background playback support
- [x] Show progress for initial connection
- [x] Indicate progress for long-running ops
- [x] Allow audio disruption for calls, etc.
- [x] Automatically reconnect if disconnected
- [x] Icon long-press restarts stream
- [ ] Support Control Center / Remote Control events (thanks to Wayne Wright for the suggestion)
- [ ] Long-pauses restart stream
- [ ] Add now playing meta data
- [ ] Provide on-air off-air user feedback

## Known issues

- [ ] Background video delays device wake then turns black. https://github.com/brentvatne/react-native-video/issues/44
- [x] Audio stream does not automatically restart after some device interruptions (e.g. incoming call sent to voice mail)
- [ ] Play button does not function when disconnected from the Internet
- [ ] Launch screen skews on iPad

## Getting started

1. Clone this project
2. Install dependencies:

    ```sh
    pod install
    npm install
    ```

If you run into problems with the Pod installation please review [CocoaPods Troubleshooting](https://guides.cocoapods.org/using/troubleshooting.html) and pay special attetion to any error messages received during the Pod installation.

3. Run `npm start` to start the Webpack watcher and the React Packager in a single shot.

   **Note:** The Webpack watcher builds the `index.ios.js` file expected by React Native.

4. Open `WLPN.xcworkspace` in XCode and run the project.
