const remotes = {
  APP2_FULL: 'http://localhost:5002/remoteEntry.js',
  APP2_REL: '5002/remoteEntry.js',
};

export const getRemoteUrl = (remoteContainer, fullPath=false) => {
  if (remoteContainer){
    const base = remoteContainer.toUpperCase()
    if(fullPath)
    {
       return remotes[`${base}_FULL`];
    }else{
      return `${window.location.protocol}//${window.location.hostname}:${remotes[`${base}_REL`]}`
    }
  }
  return null;
};
