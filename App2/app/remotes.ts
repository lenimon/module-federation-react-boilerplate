const remotes = {
  APP1_FULL: 'http://localhost:3001/remoteEntry.js',
  APP1_REL: '3001/remoteEntry.js',
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
