/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/Button';
import LazyButtonWrapper from '../../utils/LazyFedComponent';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <h1>App1</h1>
      <Button />
      <LazyButtonWrapper
        remoteContainer="app2"
        remoteModule="getRemoteButton"
      />
    </div>
  );
}
