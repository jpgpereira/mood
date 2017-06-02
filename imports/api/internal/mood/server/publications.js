import { Meteor } from 'meteor/meteor';
import Moods from '../';

Meteor.publish('moods.all', () => (
  Moods.find()
));
