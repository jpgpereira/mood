import { _ } from 'meteor/underscore';
import Constants from './constants';
import Mood from '../../api/internal/mood';

Mood.remove({});
_.map(Constants.moods, (mood) => {
  Mood.insert(mood);
});
