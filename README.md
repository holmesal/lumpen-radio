# WLPN 105.5 FM - Lumpen Radio Chicago

The [Lumpen Radio](http://lumpenradio.com) App is here. Almost...

![App screenshot](https://github.com/jhabdas/lumpen-radio/blob/master/screenshot.png)

## Features

- Streams Lumpen Radio over HTTP
- Shows connection status in app
- Plays video loop in background
- Resumes playback after interruption
- Stops playback when headset unplugged

## Todo

- [x] Add background playback support
- [x] Show progress for initial connection
- [ ] Indicate progress for long-running ops
- [x] Allow audio disruption for calls, etc.
- [ ] Provide on-air off-air user feedback
- [x] Automatically reconnect if disconnected
- [ ] Icon long-press resets HTTP connection
- [ ] Long-pauses restart stream

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

4. Open `LUMPEN.FM.xcworkspace` in XCode and run the project.
