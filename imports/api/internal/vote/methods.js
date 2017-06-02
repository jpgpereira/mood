import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Match, check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Constants from '../../../startup/server/constants';
import Yeelight from '../../../lib/yeelight';
import Functions from '../../../startup/server/lib';
import Votes from '.';

/**
 * [addVote description]
 * @param  {[type]} team         [description]
 * @return [type]                  [description]
*/
export const addVote = new ValidatedMethod({
  name: 'votes.add',
  validate(data) {
    check(data, {
      mood: String,
      user: Match.Optional(String),
    });
  },
  run({ mood, user }) {
    const toAdd = {
      mood,
      user,
      when: new Date(),
    };
    const vote = Votes.insert(toAdd);
    if (vote) {
      Meteor.setTimeout(() => {
        _.map(Constants.moods, (m) => {
          if (m._id === mood) {
            Yeelight.setBrightness(m.brightness);
            Yeelight.changeColor(m.color);
          }
        });
        Meteor.sleep(2000);
        Functions.lightMood();
      }, 10);
    }

    return vote;
  },
});

/**
 * [getVotes description]
 * @param  {[type]} team         [description]
 * @return [type]                  [description]
*/
export const getVotes = new ValidatedMethod({
  name: 'votes.get',
  validate(data) {
    check(data, {
      mood: Match.Optional(String),
    });
  },
  run({ mood }) {
    console.log('get votes');
    const query = {};
    if (mood) {
      console.log(mood);
      query.mood = mood;
    }
    return Votes.find(query).fetch();
  },
});
