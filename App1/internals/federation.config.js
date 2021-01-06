function getFederationConfig() {
  return {
    hostScope: 'app1',
    remoteScopes: {
      app2: 'app2',
    },
    exposedFactories: {
      getConnectedCard: './app/exposed/ConnectedCardFactory',
    },
  };
}

function getRemoteEntries() {
  return {
    app2: {
      full_path: 'http://localhost:5002/secure/app2/remoteEntry.js',
      relative_path: '5002/secure/app2/remoteEntry.js',
    },
  };
}

module.exports = { getFederationConfig, getRemoteEntries };
