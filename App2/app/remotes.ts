const remotes = {
  FULL:{
    APP1: 'http://localhost:5001/remoteEntry.js',
  },
  REL:{
    APP1: '5001/remoteEntry.js',
  }
};

const loadRemoteUrl = async (url)=>{
  return new Promise((resolve, reject)=>{
    const element = document.createElement('script');
    element.id = url;
    element.src = url;
    element.type = 'text/javascript';
    element.onload = () => {
      console.log(`loaded ${url}`);
      resolve(`loaded ${url}`);
    };
    element.onerror = () => {
      document.head.removeChild(element);
      reject(`failed to load ${url}`);
    };
    document.head.appendChild(element);
  });
}

export const getRemoteUrl = (remoteScope, type) => {
  const url = remotes[type.toUpperCase()][remoteScope.toUpperCase()];
  if(url){
    if(type.toUpperCase()=="REL"){
      return `${window.location.protocol}//${window.location.hostname}:${url}`
    } else{
      return url;
    }
  }
  return null;
};

export const loadAllRemotes: Array<Object> = (type="REL") =>{
    const remoteScopes = Object.keys(remotes[type]);
    const remoteEntries = [];
    try{
      remoteScopes.map((remoteScope) => remoteEntries.push(loadRemoteUrl(getRemoteUrl(remoteScope, type))));
      return remoteEntries;
    }catch(e){
      console.log(e)
    }
    return remoteEntries;
}
