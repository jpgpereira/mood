import { Meteor } from 'meteor/meteor';
import React from 'react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Mood from './Mood.jsx';

const App = ({ moods, loading }) => {
  Meteor.call('mood.get', {}, (err, res) => {
    if (!err) {
      document.styleSheets[0].addRule('.bgGIF', `background: url(moods/${res}/bg.gif) center center no-repeat fixed`);
      document.styleSheets[0].addRule('.bgGIF', 'background-size: cover');
      document.styleSheets[0].addRule('.bgIMG', `background: url(moods/${res}/bg1.png) center center no-repeat fixed`);
      document.styleSheets[0].addRule('.bgIMG', 'background-size: cover');
    }
  });

  if (loading) {
    return (
      <Grid
        className="content"
        container
        gutter={0}
        justify="center"
        align="center"
      >
        Loading
      </Grid>
    );
  }
  return (
    <div className="bgGIF">
      <div className="bgIMG">
        <img className="logo" alt="Mood" src="/logo.png" />
        <Grid
          className="content"
          container
          gutter={0}
          justify="center"
          align="center"
        >
          <Grid
            container
            direction="row"
            justify="center"
          >
            {
              _.map(moods,
                mood => (
                  <Mood key={mood._id} {...mood} />
                ),
              )
            }
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

App.propTypes = {
  moods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default App;
