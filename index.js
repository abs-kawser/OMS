/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
//import AppPro  from './AppPro';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
