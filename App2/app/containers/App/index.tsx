/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { withFallback } from 'utils/withFallback';
import LoadRemoteCmp from 'utils/LoadRemoteCmp';
import ButtonCmp from '../../components/ButtonCmp';

export default function App() {
  const exposedRef = React.useRef({ methods: {} });

  // bind exposed methods from remote to host page
  const setExposedMethods = (exposedMethods) => {
    exposedRef.current.methods = exposedMethods;
  };

  const saveClickHandler = () => {
    exposedRef.current.methods.exposedOnClick();
  };

  const injectedFallback = {
    withFallback,
    fallbackProps: {
      featureName: 'App2 Card(Host)',
      // fallbackComponent: () => <p>oops, something went wrong</p>,
    },
  };

  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <h1>App2</h1>
      <ButtonCmp clickedButton={saveClickHandler} />
      <LoadRemoteCmp
        remoteContainer="app1"
        remoteModule="getConnectedCard"
        config={{
          useInjectSaga,
          useInjectReducer,
          injectedFallback,
        }}
        componentProps={{
          getExposedMethods: setExposedMethods,
        }}
      />
    </div>
  );
}
