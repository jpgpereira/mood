import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { Holdable, defineHold } from 'react-touch';

const HOLD_CONFIG = defineHold({ updateEvery: 50, holdFor: 1000 });

const Mood = ({ _id, name, updateBGVote }) => {
  const handleHold = () => {
    Meteor.call(
      'votes.add',
      {
        mood: _id,
      },
      (err) => {
        if (!err) {
          updateBGVote(_id);
        }
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
                  disableRipple
                  className="moodButton"
                  fab
                >
                  {name}
                </Button>
                {holdProgress > 0 &&
                  <CircularProgress
                    className={ClassNames('moodButtonSpinner', _id)}
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
  updateBGVote: PropTypes.func.isRequired,
};

export default Mood;
