// import { Meteor } from 'meteor/meteor';
import { Match, check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Functions from '../../../startup/server/lib.js';

/**
 * [getMood description]
 * @param  {[type]} team         [description]
 * @return [type]                  [description]
*/
export const getMood = new ValidatedMethod({
  name: 'mood.get',
  validate(data) {
    check(data, {
      when: Match.Optional(Date),
    });
  },
  run({ when }) {
    const query = {};
    if (when) {
      query.mood = when;
    }
    return Functions.calculateMood(query);
  },
});

/**
 * [getMood description]
 * @param  {[type]} team         [description]
 * @return [type]                  [description]
*/
export const currentMood = new ValidatedMethod({
  name: 'mood.current',
  validate() {},
  run() {
    return Functions.currentMood();
  },
});
