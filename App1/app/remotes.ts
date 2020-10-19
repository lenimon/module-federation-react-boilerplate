import { remoteEntries as remotes } from './federation/config.json';

const loadRemoteUrl:Function = async (url: string):Promise<Object>=>{
  return new Promise((resolve, reject)=>{
    const element:HTMLScriptElement = document.createElement('script');
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

export const getRemoteUrl:Function = (remoteScope:string, type:string) => {
  const url = remotes[remoteScope.toLowerCase()][`${type.toLowerCase()}_path`];
  if(url){
    if(type.toLowerCase()=="relative"){
      return `${window.location.protocol}//${window.location.hostname}:${url}`
    } else{
      return url;
    }
  }
  return null;
};

export const loadAllRemotes:Function = (type:string="relative"): Array<Promise<Object>> =>{
    const remoteScopes = Object.keys(remotes);
    const remoteEntries:Array<Promise<Object>> = [];
    try{
      remoteScopes.map((remoteScope) => remoteEntries.push(loadRemoteUrl(getRemoteUrl(remoteScope, type))));
      return remoteEntries;
    }catch(e){
      console.log(e)
    }
    return remoteEntries;
}
