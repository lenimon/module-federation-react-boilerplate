import * as React from 'react';
import { Button } from '@material-ui/core'

export default (props) => (
  <Button
    onClick={() => alert('App2 button clicked')}
    variant="contained"
    color="primary"
  >
    App2 Button
  </Button>
);
