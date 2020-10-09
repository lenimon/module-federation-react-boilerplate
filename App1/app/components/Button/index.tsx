import * as React from 'react';
import { Button } from '@material-ui/core'

export default (props) => (
  <Button
    onClick={() => alert('App1 button clicked')}
    variant="contained"
    color="secondary"
  >
    App1 Button
  </Button>
);
