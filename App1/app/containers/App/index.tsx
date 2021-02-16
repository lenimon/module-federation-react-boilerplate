/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import ConnectedCard from '../ConnectedCard';
import LoadRemoteCmp from '../../utils/LoadRemoteCmp';

export default function App() {
  const exposedRef = React.useRef({ methods: {} });
  const ebProps = { featureName: 'App1', errorMessage: 'Error from app1' };
  // bind exposed methods from remote to host page
  const setExposedMethods = (exposedMethods) => {
    exposedRef.current.methods = exposedMethods;
  };

  const saveClickHandler = () => {
    exposedRef.current.methods.exposedOnClick();
  };

  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <h1>App1</h1>
      <LoadRemoteCmp
        remoteContainer="app2"
        remoteModule="getRemoteButton"
        componentProps={{
          clickedButton: saveClickHandler,
        }}
      />
      <ConnectedCard ebProps={ebProps} getExposedMethods={setExposedMethods} />
    </div>
  );
}
