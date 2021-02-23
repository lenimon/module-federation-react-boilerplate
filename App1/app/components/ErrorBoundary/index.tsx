import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      featureName: this.props.ebProps.featureName,
      errorMessage: this.props.ebProps.errorMessage,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    //   logErrorToMyService(error, errorInfo);
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  // componentDidMount() {
  //   const fallbackData = getInjectWithFallback();
  //   this.setState({ fallbackData: fallbackData.ebProps });
  // }

  render() {
    return this.state.hasError ? (
      <div>
        <h3>Title: {this.state.featureName}</h3>
        <h5>Message: {this.state.errorMessage}</h5>
      </div>
    ) : (
      <Suspense fallback={<div />}>{this.props.children}</Suspense>
    );
  }
}

export default ErrorBoundary;
