# WLPN 105.5 FM Lumpen Radio Chicago

[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/jhabdas/lumpen-radio)
[![Dependency Status](https://david-dm.org/jhabdas/lumpen-radio.svg)](https://david-dm.org/jhabdas/lumpen-radio)
[![devDependency Status](https://david-dm.org/jhabdas/lumpen-radio/dev-status.svg)](https://david-dm.org/jhabdas/lumpen-radio#info=devDependencies)

The [Lumpen Radio App](http://appsto.re/us/NdeV7.i) is here.

![WLPN neon artowrk](https://github.com/jhabdas/lumpen-radio/blob/master/photo-original.jpg)

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

## Digging in

To learn more about React Native and how this app is built check out the video from the talk given to the React group in Chicago on [30 Jun 2015](http://www.meetup.com/React-Chicago/events/222510246/) and the [accompanying slide deck](https://slides.com/jhabdas/streaming-audio-react-native).

## File Structure

    ├── iOS                         # Source code
    │   ├── Classes                 # Objective-C, Swift classes
    │   │   ├── AppDelegate         # Application initialization and React Native config
    │   │   ├── AudioManager        # Lib to access platform APIs and bridge to JS
    │   │   └── RootViewController  # RCTRootViewController override to manage Remote Control events
    │   ├── Images.xcassets         # Launch screens and native image assets
    │   ├── Resources               # Other native resources
    │   ├── Constants.h             # Native globals
    │   ├── Info.plist              # Project configuration
    │   ├── main.jsbundle           # React Native placeholder file
    │   └── main.m                  # Application entry point
    ├── src                         # Source code
    │   ├── assets                  # Static resources
    │   │   └── videos              # Video assets
    │   ├── components              # React Native Components
    │   ├── lib                     # JS libraries
    │   ├── stores                  # JS persistence with Flux
    │   ├── actions.es6             # Flux actions
    │   ├── main.es6                # JS application entry point
    │   └── styles.es6              # React Native Style Rules
    ├── .eslintrc                   # JS linter configuration
    ├── .flowconfig                 # Facebook flow config file
    ├── .gitignore                  # VCS blacklist
    ├── Podfile                     # CocoaPods dependency specs
    ├── Podfile.lock                # Native dependency lock file
    ├── WLPN-Bridging-Header.h      # Objective-C, Swift bridge support file
    ├── ignored-modules.js          # RegExp containing modules ignored by watcher
    ├── npm-shrinkwrap.js           # JS dependency lock file
    ├── package.json                # NPM dependency specs
    ├── webpack-watch.js            # Filesystem watcher for JS
    └── webpack-config.js           # WebPack configuration

## Todo

- [x] Add background playback support
- [x] Show progress for initial connection
- [x] Indicate progress for long-running ops
- [x] Allow audio disruption for calls, etc.
- [x] Automatically reconnect if disconnected
- [x] Icon long-press restarts stream
- [x] Support Control Center / Remote Control events (thanks to Wayne Wright for the suggestion)
- [ ] Long-pauses restart stream
- [ ] Add now playing metadata (if available)
- [ ] Provide on-air off-air user feedback

## Known issues

- [x] [Background video delays device wake then turns black](https://github.com/brentvatne/react-native-video/issues/44).
- [x] Audio stream does not automatically restart after some device interruptions (e.g. incoming call sent to voice mail)
- [ ] Audio buffer out after 20 seconds of interrupted call time followed by 20 seconds of play
- [ ] Play button does not function when disconnected from the Internet
- [x] Launch screen skews on iPad

## Credits

Developed for Public Media Institute by Josh Habdas.

Artwork by Jermiah Chiu.
App interface and icon by Josh Habdas.

Turntable loop video by [Scott Schiller](http://www.scottschiller.com/), BSD.

Inspired by [open source work](https://github.com/stetro/domradio-ios/) by Steffen Tröster.

Many thanks to Public Media Institute, [Lumpen Radio](http://www.lumpenradio.com) and all the wonderful beta testers for helping make this happen. You are beautiful.

- Ed Marszewski
- Logan Bay
- Eric Olson
- Wayne Wright
- Elizabeth Rossman
- Joseph Alfallah
- Harrison Jones
- Nick Hausman
