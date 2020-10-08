import React from 'react';

export const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (url && document.getElementById(url)) {
      setReady(true);
      return;
    }
    if (!url) {
      return;
    }

    const element = document.createElement('script');
    element.id = url;
    element.src = url;
    element.type = 'text/javascript';
    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setFailed(true);
      document.head.removeChild(element);
    };

    document.head.appendChild(element);
  }, [url]);

  return {
    ready,
    failed,
  };
};
