# module-federation-react-boilerplate
module federation examples in react boilerplate
This example is trying to address module_federation implementation challenges and solutions in the simplest possible manner.

The repo holds 2 application app1 and app2,  which exposes and requires react components bidirectional. For simplicity both apps are using bare minimum UI. App1 exposes a connected(saga, reducer wired) material-ui card component as “getConnectedCard” factory function. It expects a config object holding the saga and reducer injectors from the host application(app2 in this case). App2 exposes a simple non-connected material-ui button component as “getRemoteButton” factory function. It doesn’t take in any argument.
Both applications use a wrapper component “LoadRemoteCmp.tsx” from the utils. This encapsulates the logic for initializing the pre loaded container > load & execute the factory function > get the remote component  & mount it. LoadRemoteCmp expects the container remoteEntry to be preloaded, which in this case is loaded by the remotes utility. 
Directory Structure: (Only federation specific files are captured below.)
App
  app
    federation
      exposed
          ComponentFactory
          index.ts
      config.json
    ……components, containers,…
  utils
    LoadRemoteCmp.tsx
    useDynamicScript.ts
    …reducerInjectors.ts, sagaInjectors.ts…
  app.tsx
  remotes.ts
  …bootstrap.ts, reducers.ts, index.html…
  Internals
    webpack
      webpack.base.babel.js
    ...scripts, generators...
    
    
	
