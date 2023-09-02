/**
 * @format
 */
import { LogBox } from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//For avoiding warnings
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
