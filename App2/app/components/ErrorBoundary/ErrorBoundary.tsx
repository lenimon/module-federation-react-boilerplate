import { getInjectWithFallback } from 'containers/config';
// import ConnectedCard from 'containers/ConnectedCard';
import React, {Suspense} from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false};
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    //   logErrorToMyService(error, errorInfo);
    // this.setState({ error });
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
        {/* App1: {this.state.error } */}
        <div>something went wrong</div>
      </div>
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

// const errorBoundary = (): typeof ErrorBoundary => {
//   return ErrorBoundary;
// }

export default ErrorBoundary;
