/**
 * @format
 */
import { LogBox } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

//For avoiding warnings
LogBox.ignoreAllLogs(true);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage.notification.body);
});
AppRegistry.registerComponent(appName, () => App);
