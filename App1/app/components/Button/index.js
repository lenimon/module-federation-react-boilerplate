import * as React from 'react';

function Button(props) {
  return (
    <button
      onClick={() => alert('App1 button clicked')}
      style={{ backgroundColor: 'lightblue' }}
    >
      App1 Button
    </button>
  );
}

export default Button;
