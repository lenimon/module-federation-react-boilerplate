import React, { Component } from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';

const storybookStyling = (storyFn) => {
  const style = {
    padding: '32px',
  };

  return <div style={style}>{storyFn()}</div>;
};

// automatically import all files ending in *.stories.js
const req = require.context('../app', true, /\.stories\.tsx$/);
function loadStories() {
  addDecorator(storybookStyling);
  addParameters({
    options: {
      name: 'BAM Presentation',
      addonPanelInRight: true,
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\//,
    },
  });
  req.keys().forEach((filename) => req(filename));
  addDecorator(withTheme);
}

configure(loadStories, module);
