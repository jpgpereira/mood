import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Moods from '../../api/internal/mood';
import App from '../components/App.jsx';

export default createContainer(() => {
  const moods = Meteor.subscribe('moods.all');
  const loading = !moods.ready();
  return {
    moods: Moods.find(
      {
        _id: {
          $ne: 'actual',
        },
      },
    ).fetch(),
    actual: Moods.find(
      {
        _id: 'actual',
      },
    ).fetch()[0],
    loading,
  };
}, App);
