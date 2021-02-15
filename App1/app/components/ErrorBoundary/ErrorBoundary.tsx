import { getInjectWithFallback } from 'containers/config';
import ConnectedCard from 'containers/ConnectedCard';
import React, {Suspense} from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    //   logErrorToMyService(error, errorInfo);
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  componentDidMount() {
    debugger;
    let fallbackData = getInjectWithFallback();
    this.setState({fallbackData:fallbackData.fallbackProps})
  }

  render() {
     return this.state.hasError ? (
      <div>
        App1: {this.props.error || this.state.fallbackData.featureName}
        <div>{this.state.fallbackData.errorMessage}</div>
      </div>
    ) : (
      <Suspense  fallback= {<div/>} >
           <ConnectedCard getExposedMethods={this.props.getExposedMethods}/>
      </Suspense>
    );
  }
}

const errorBoundary = (): typeof ErrorBoundary => {
  return ErrorBoundary;
}

export default errorBoundary;
