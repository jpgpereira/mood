import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import Yeelight from '../../lib/yeelight';
import Constants from './constants.js';

export const testOne = (name) => {
  _.map(Constants.moods, (mood) => {
    if (mood.name === name) {
      // Yeelight.setBrightness(mood.brightness);
      // Yeelight.changeColor(mood.color);
      Yeelight.triggerIFTTT(mood._id);
    }
  });
};

export const testSet = (brightness) => {
  // console.log('test on', brightness);
  _.map(Constants.moods, (mood) => {
    // console.log(mood.name);
    Yeelight.setBrightness(brightness);
    Yeelight.changeColor(mood.color);
    Meteor.sleep(5000);
  });
};

Meteor.startup(() => {
  process.env.IFTTT_MAKER_KEY = 'nO1Y-fCo_QneowIwsuhfpX4eO3BjB-ZOk2RAOUYdQx8';
});
