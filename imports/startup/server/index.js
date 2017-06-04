import { Meteor } from 'meteor/meteor';
import Yeelight from '../../lib/yeelight';
import './api.js';
import './setup.js';
import {
  // testOne,
  // testSet,
} from './dev.js';

Meteor.startup(() => {
  Yeelight.turnLightsOn();
  Yeelight.resetColor();
  Meteor.sleep(1000);
  // testSet(25);
  // testSet(50);
  // testSet(75);
  // testSet(100);
  // testOne('Joyful');
  // testOne('Powerful');
  // testOne('Peaceful');
  // testOne('Scared');
  // testOne('Sad');
  // testOne('Mad');
});
