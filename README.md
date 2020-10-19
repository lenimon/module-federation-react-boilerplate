# Module Federation POC
This example is trying to address module_federation implementation challenges and solutions in the simplest possible manner.
  - Bidirectional sharing connected/non-connected components.
  - Preload all remoteEntries prior to app load.
  - Utility to load container on demand available optionally.
  - relative remote public path issue solution.
  - Exposing/Calling an internal function within the scope of remote component.
  - Exposing components via getter functions.

# App Structure!

  The repo holds 2 application app1 and app2,  which exposes and requires react components bidirectional. For simplicity both apps are using bare minimum UI. App1 exposes a connected(saga, reducer wired) material-ui card component as “getConnectedCard” factory function. It expects a config object holding the saga and reducer injectors from the host application(app2 in this case). App2 exposes a simple non-connected material-ui button component as “getRemoteButton” factory function. It doesn’t take in any argument.
  Both applications use a wrapper component “LoadRemoteCmp.tsx” from the utils. This encapsulates the logic for initializing the pre loaded container > load & execute the factory function > get the remote component  & mount it. LoadRemoteCmp expects the container remoteEntry to be preloaded, which in this case is loaded by the remotes utility. 

Directory Structure: (Only federation specific files are captured below.)
```sh
App
->app
->->federation
->->->exposed
->->->->ComponentFactory
->->->->index.ts
->->config.json
->->……components, containers,…
->utils
->->LoadRemoteCmp.tsx
->->remotes.ts
->->useDynamicScript.ts
->->…reducerInjectors.ts, sagaInjectors.ts…
->app.tsx
->app1/2.tsx
->…bootstrap.ts, reducers.ts, index.html…
->Internals
->->webpack
->->->webpack.base.babel.js
->->...scripts, generators...
```

### Explanation

* [app->components] - non-connected/dumb react components
* [app->containers] - connected(saga, reducer wired) react components. The connection config is handled in config.ts At present only saga and reducer injectors are configurable here. We could add other properties like the openenv api factory here if applicable.
* [app->federation->exposed] - holds the component/container factories which are exposed
* [app->federation->config.json] - module federation specific configurations. This doesn't qualify as the sole configuration. This json is just an easier access lookup which is mapped to the webpack configuration and remotes.ts with exposed and remotes related configurations.
* [app->utils->LoadRemoteCmp.tsx] - The remote container and remote module lazy loading and mounting is handled by this wrapper component 
* [app/utils/remotes.tsx] - This file has the utilities to load the remoteEntries.
* [app->utils->useDynamicScript.ts] - Incase a remoteEntry or other dependency is expected to be loaded and mounted on demand instead of preloading on app launch, this hook could be used. Currently this hook is not used in this example. We are preloading all remoteEntries on app launch itself.
* [app1/2.tsx] - This file will be invoked by the remoteEntry from the host app to resolve the relative path issue, when import(remoteContainer/remoteModule) way of importing is used. In our scenario this is not necessary. We are encapsulating the container and module load mounts in LoadRemoteCmp.tsx utility wrapper. There we access the remote scope from the window object directly instead of expecting webpack to resolve import(remoteContainer/remoteModule) for us. But you could use import(remoteContainer/remoteModule) import pattern incase if you need to load a module without relying on LoadRemoteCmp utility and it would work perfectly fine due to this file here.

### Installation

```sh
$ cd //to root/app1 directory
$ npm/yarn install
$ cd //to root/app2 directory
$ npm/yarn install
$ cd..
$ npm/yarn start
```



### Todos

 - Tweak the structure of app post review
 - More refactoring needed
 - shared package section need to be dynamic and reviewed  

License
----

MIT
