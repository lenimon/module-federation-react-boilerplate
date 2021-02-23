import React from 'react';

export default function ErrorTemplate(props) {
  return (
    <div style={{ height: '100%', width: '100%', background: 'blue' }}>
      <h1>{props.error.errorMessage}</h1>
      <p>{props.error.stack}</p>
    </div>
  );
}
