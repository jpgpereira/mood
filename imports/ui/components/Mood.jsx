import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { Holdable, defineHold } from 'react-touch';
// import { withStyles, createStyleSheet } from 'material-ui/styles';

const HOLD_CONFIG = defineHold({ updateEvery: 50, holdFor: 1000 });

const Mood = ({ _id, name }) => {
  const handleHold = () => {
    Meteor.call(
      'votes.add',
      {
        mood: _id,
      },
    );
  };

  return (
    <Grid item>
      <div className="outterMoodButton">
        <Holdable
          config={HOLD_CONFIG}
          onHoldComplete={handleHold}
        >
          {
            ({ holdProgress }) => (
              <div>
                <Button
                  className="moodButton"
                  fab
                >
                  {name}
                </Button>
                {holdProgress > 0 &&
                  <CircularProgress
                    className="moodButtonSpinner"
                    mode="determinate"
                    value={holdProgress * 100}
                  />
                }
              </div>
            )
          }
        </Holdable>
      </div>
    </Grid>
  );
};

Mood.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // classes: PropTypes.shape({}).isRequired,
};

// export default withStyles(styleSheet)(Mood);
export default Mood;
