import * as React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ButtonCmp = (props) => (
  <Button
    onClick={() => props.clickedButton()}
    variant="contained"
    color="primary"
  >
    App2 Button
  </Button>
);

export default withStyles(styles)(ButtonCmp);
