import { Meteor } from 'meteor/meteor';
import Yeelight from '../../lib/yeelight';
import './api.js';
import './setup.js';
// import TestColors from './dev.js';

Meteor.startup(() => {
  Yeelight.turnLightsOn();
  Yeelight.resetColor();
  Meteor.sleep(1000);
  // TestColors.testSet(25);
  // TestColors.testSet(50);
  // TestColors.testSet(75);
  // TestColors.testSet(100);
  // TestColors.testOne('Joyful');
  // TestColors.testOne('Powerful');
  // TestColors.testOne('Peaceful');
  // TestColors.testOne('Scared');
  // TestColors.testOne('Sad');
  // TestColors.testOne('Mad');
});
