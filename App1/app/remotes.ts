const remotes = {
  BAM: '3002/bamRemoteEntry.js',
};

export const getRemoteUrl = (scope) => {
  if (scope && remotes[scope]) return remotes[scope];
  return null;
};
