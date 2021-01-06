function getFederationConfig() {
  return {
    hostScope: 'app2',
    remoteScopes: {
      app1: 'app1',
    },
    exposedFactories: {
      getRemoteButton: './app/exposed/ButtonFactory',
    },
  };
}

function getRemoteEntries() {
  return {
    app1: {
      full_path: 'http://localhost:5001/secure/app1/remoteEntry.js',
      relative_path: '5001/secure/app1/remoteEntry.js',
    },
  };
}

module.exports = { getFederationConfig, getRemoteEntries };
