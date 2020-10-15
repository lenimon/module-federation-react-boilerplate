/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadRemoteCmp from 'utils/LoadRemoteCmp';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <h1>App2</h1>
      <Button />
      <LoadRemoteCmp
        remoteContainer="app1"
        remoteModule="getConnectedCard"
        config={{
          useInjectSaga,
          useInjectReducer
        }}
      />
    </div>
  );
}
