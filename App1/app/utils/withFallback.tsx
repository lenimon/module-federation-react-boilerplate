/* eslint-disable max-classes-per-file */

/**
 *
 * withFallback
 *
 */

import React from 'react';
import SectionError from 'components/SectionError';

type State = {
  // hasError?: boolean;
  error?: string;
  errorInfo?: { componentStack: string };
};

type Props = {
  featureName?: string;
  fallbackComponent?: React.Component;
};

// export const withFallback = (ComponentThatMayFail: any) => {
//   return class ErrorHandler extends React.Component {
//     render() {
//       return (
//         <ErrorBoundary>
//           <ComponentThatMayFail {...this.props} />
//         </ErrorBoundary>
//       );
//     }
//   };
// };

export const withFallback = (fallbackProps?: Props) => (
  ComponentThatMayFail,
) => {
  const featureName = fallbackProps?.featureName || ComponentThatMayFail.name;

  const fallbackComponent = fallbackProps?.fallbackComponent
    ? fallbackProps.fallbackComponent
    : null;
  // const { fallbackComponent } = fallbackProps;
  // eslint-disable-next-line react/prefer-stateless-function
  class ErrorHandler extends React.Component {
    render() {
      return (
        <ErrorBoundary
          featureName={featureName}
          fallbackComponent={fallbackComponent}
          onRetry={this.props.onRetry}
        >
          <ComponentThatMayFail {...this.props} />
        </ErrorBoundary>
      );
    }
  }
  ErrorHandler.displayName = `${featureName}WithFallback`;
  return ErrorHandler;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      // hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
    this.FallbackComponent = props.fallbackComponent || SectionError;
  }

  FallbackComponent;

  // static getDerivedStateFromError(error: any) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true, error };
  // }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <this.FallbackComponent
          featureName={this.props.featureName}
          onRetry={this.props.onRetry}
          error={this.state.error.toString()}
        >
          {process.env.NODE_ENV !== 'production' && this.state.errorInfo && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </this.FallbackComponent>
      );
    }
    return this.props.children;
  }
}
