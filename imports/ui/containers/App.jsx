import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Moods from '../../api/internal/mood';
import App from '../components/App.jsx';

export default createContainer(() => {
  const moods = Meteor.subscribe('moods.all');
  const loading = !moods.ready();
  return {
    moods: Moods.find().fetch(),
    loading,
  };
}, App);
