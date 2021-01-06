import { getRemoteEntries } from '../../internals/federation.config';
const remoteEntries = getRemoteEntries();

const loadRemoteUrl: Function = async (
  url: string,
  remoteScope: string,
): Promise<Object> =>
  new Promise((resolve, reject) => {
    const element: HTMLScriptElement = document.createElement('script');
    element.id = url;
    element.src = url;
    element.type = 'text/javascript';
    element.onload = async () => {
      console.log(`loaded ${url}`);
      // @ts-ignore
      await __webpack_init_sharing__('default');
      // @ts-ignore
      await window[remoteScope].init(__webpack_share_scopes__.default);
      console.log(`initialized remoteScope ${remoteScope}`);
      resolve(`loaded ${url}`);
    };
    element.onerror = () => {
      document.head.removeChild(element);
      reject(new Error(`failed to load ${url}`));
    };
    document.head.appendChild(element);
  });

export const getRemoteUrl: Function = (remoteScope: string, type: string) => {
  const url =
    remoteEntries[remoteScope.toLowerCase()][`${type.toLowerCase()}_path`];
  if (url) {
    if (type.toLowerCase() == 'relative') {
      return `${window.location.protocol}//${window.location.hostname}:${url}`;
    }
    return url;
  }
  return null;
};

export const loadAllRemotes: Function = (
  type: string = 'relative',
): Array<Promise<Object>> => {
  const remoteScopes = Object.keys(remoteEntries);
  const remoteEntriesArr: Array<Promise<Object>> = [];
  try {
    remoteScopes.map((remoteScope) =>
      remoteEntriesArr.push(
        loadRemoteUrl(getRemoteUrl(remoteScope, type), remoteScope),
      ),
    );
    return remoteEntriesArr;
  } catch (e) {
    console.log(e);
  }
  return remoteEntriesArr;
};
