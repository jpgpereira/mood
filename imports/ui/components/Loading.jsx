import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

const Loading = () => (
  <div>
    <img className="logo" alt="Mood" src="/logo.png" />
    <Grid
      className="preloader_content"
      container
      gutter={0}
      justify="center"
      align="center"
    >
      <Grid item>
        <CircularProgress className="preloader_spinner" />
      </Grid>
    </Grid>
  </div>
);

export default Loading;
