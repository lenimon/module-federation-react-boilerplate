import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' },
  };

  static getDerivedStateFromError = (error) => ({ hasError: true, error });

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    return hasError ? (
      <div>
        App1: {error.message}
        <p>{info}</p>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
