import * as React from 'react';

export default function(props) {
  return (
    <button
      onClick={() => alert('App1 button clicked')}
      style={{ backgroundColor: 'lightblue' }}
    >
      App1 Button
    </button>
  );
}
