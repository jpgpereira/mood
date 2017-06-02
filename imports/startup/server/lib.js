import { _ } from 'meteor/underscore';
import Votes from '../../api/internal/vote';
import Moods from '../../api/internal/mood';
import Yeelight from '../../lib/yeelight';
import Constants from './constants';

const calculateMood = (query) => {
  let toRet = '';
  let votes = 0;
  Moods.find().forEach((mood) => {
    const moodQuery = query;
    if (!toRet) {
      toRet = mood._id;
    }
    moodQuery.mood = mood._id;
    const moodVotes = Votes.find(query).fetch().length;
    if (moodVotes > votes) {
      toRet = mood._id;
      votes = moodVotes;
    }
  });
  return toRet;
};

const lightMood = () => {
  const actual = calculateMood({});
  _.map(Constants.moods, (m) => {
    if (m._id === actual) {
      Yeelight.setBrightness(m.brightness);
      Yeelight.changeColor(m.color);
    }
  });
};

export default {
  calculateMood,
  lightMood,
};
