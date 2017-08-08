import { _ } from 'meteor/underscore';
import Votes from '../../api/internal/vote';
import Moods from '../../api/internal/mood';
import Yeelight from '../../lib/yeelight';
import Constants from './constants';

const calculateMood = (query) => {
  let toRet = '';
  let toRetMood = {};
  let votes = 0;
  Moods.find().forEach((mood) => {
    const moodQuery = query;
    if (!toRet) {
      toRet = mood._id;
      toRetMood = mood;
    }
    moodQuery.mood = mood._id;
    const moodVotes = Votes.find(query).fetch().length;
    if (moodVotes > votes) {
      toRet = mood._id;
      votes = moodVotes;
      toRetMood = mood;
    }
  });
  Moods.update(
    {
      _id: 'actual',
    },
    {
      $set: {
        name: toRetMood.name,
        color: toRetMood.color,
        id: toRetMood._id,
      },
    },
  );
  return toRet;
};

const currentMood = () => (
  Moods.findOne(
    {
      _id: 'actual',
    },
  )
);

const lightMood = () => {
  const actual = calculateMood({});
  _.map(Constants.moods, (m) => {
    if (m._id === actual) {
      // Yeelight.setBrightness(m.brightness);
      // Yeelight.changeColor(m.color);
      Yeelight.triggerIFTTT(m._id);
    }
  });
};

export default {
  calculateMood,
  currentMood,
  lightMood,
};
