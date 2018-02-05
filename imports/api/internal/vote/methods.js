import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Match, check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Constants from '../../../startup/server/constants';
import Yeelight from '../../../lib/yeelight';
import Functions from '../../../startup/server/lib';
import Votes from '.';

/**
 * Add a new vote entry to database
 * @param  {string} mood    Mood voted
 * @param  {string} user    User that voted
 * @return {object}         _id for new vote
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
            Yeelight.triggerIFTTT(m._id);
          }
        });
        Meteor.sleep(10000);
        Functions.lightMood();
      }, 10);
    }

    return vote;
  },
});

/**
 * Returns list of votes
 * @param  {string} mood    Mood to filter votes
 * @return {Array}          All votes, or filtered by mood
*/
export const getVotes = new ValidatedMethod({
  name: 'votes.get',
  validate(data) {
    check(data, {
      mood: Match.Optional(String),
    });
  },
  run({ mood }) {
    const query = {};
    if (mood) {
      query.mood = mood;
    }
    return Votes.find(query).fetch();
  },
});
