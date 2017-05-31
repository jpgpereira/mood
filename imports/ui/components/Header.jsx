import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const styleSheet = createStyleSheet('Header', {
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
  },
});

const Header = (props) => {
  const classes = props.classes;
  return (
    <AppBar
      className={classes.appBar}
    >
      <Toolbar>
        <Typography
          type="title"
          colorInherit
          className={classes.title}
        >
          Mood
        </Typography>
        <IconButton contrast>
          <Icon>help</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styleSheet)(Header);
