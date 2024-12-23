# Adventures in Abya Yala
This is a rogue-like game set in an Indigenous fantasy world where you build an ever-shifting party to overcome a string of events.
The core of the game is around strategic choice making.
You'll have clear ideas of the immediate outcome of your choices but only a speculation about later consequences.
The game is written in TypeScript and runs on mobile platforms using Cordova.

## Setup
You will need to install the Android SDK to build and run this project.
You must also run the following commands:

```bash
# Install dependencies
npm install

# Sets up Cordova library code
cordova platform add android
cordova platform add browser
```

## Commands
We have a number of `npm` commands:
- `start` runs the game server and listens for code changes
- `compile` builds all the TypeScript code
- `format` makes the code pretty and lints everything
- `android` compiles and deploys the game to an android device
- `test` run the unit tests
- `apk` copy the built APK file to the root directory

Run the following commands to build an APK for deployment:

```bash
export JAVA_HOME="/usr/lib/jvm/<something>"
cordova build android --release -- --packageType=bundle
npm run aab
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <my-key-store>.keystore -storepass <password> app-release.aab <keystore-alias>
```
