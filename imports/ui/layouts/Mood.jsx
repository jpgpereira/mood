import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../containers/App.jsx';

const Mood = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

export default Mood;
