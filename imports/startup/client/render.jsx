import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Mood from '../../ui/layouts/Mood.jsx';

Meteor.startup(() => {
  injectTapEventPlugin();
  render(
    <Mood />,
    document.getElementById('app'),
  );
});
