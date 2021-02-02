import * as React from 'react';

type Props = {
  remoteContainer: any;
  remoteModule: any;
  /** The config object passed to the federated component factory  */
  config: Object;
  /** callback for error */
  onError?: (error: any) => void;
  /** Props to be passed to the component. */
  componentProps: any;
};

function LoadRemoteCmp(props: Props) {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null,
  );
  const [status, setStatus] = React.useState('not loaded');
  const {
    remoteContainer,
    remoteModule,
    config,
    onError,
    componentProps,
  } = props;

  const loadRemoteFactory = async () => {
    try {
      const module = await window[remoteContainer].get(remoteModule);
      const factory = module().default;
      const component = config ? factory(config) : factory();
      setComponent(component);
    } catch (error) {
      console.log(error);
      setStatus('failed');
      onError && onError(error);
    }
  };

  React.useEffect(() => {
    loadRemoteFactory();
    return () => {
      console.log('unmounting');
    };
  }, []);

  if (status === 'failed') {
    return <span>failed</span>;
  }

  if (Component) {
    if (componentProps) return <Component {...componentProps} />;
    return <Component />;
  }

  return <span>Loading...</span>;
}

export default LoadRemoteCmp;
