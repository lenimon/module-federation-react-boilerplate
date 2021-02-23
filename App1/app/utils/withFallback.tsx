/* eslint-disable max-classes-per-file */

/**
 *
 * withFallback
 *
 */

import React from 'react';
import SectionError from 'components/SectionError';
import { getInjectWithFallback } from 'containers/config';
import ErrorTemplate from './errorTemplate';

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

// export const withFallback = (fallbackProps?: Props) => (
//   ComponentThatMayFail,
// ) => {
//   const featureName = fallbackProps?.featureName || ComponentThatMayFail.name;

//   const fallbackComponent = fallbackProps?.fallbackComponent
//     ? fallbackProps.fallbackComponent
//     : null;
//   // const { fallbackComponent } = fallbackProps;
//   // eslint-disable-next-line react/prefer-stateless-function
//   class ErrorHandler extends React.Component {
//     render() {
//       return (
//         <ErrorBoundary
//           featureName={featureName}
//           fallbackComponent={fallbackComponent}
//           onRetry={this.props.onRetry}
//         >
//           <ComponentThatMayFail {...this.props} />
//         </ErrorBoundary>
//       );
//     }
//   }
//   ErrorHandler.displayName = `${featureName}WithFallback`;
//   return ErrorHandler;
// };

// class ErrorBoundary extends React.Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       // hasError: false,
//       error: undefined,
//       errorInfo: undefined,
//     };
//     this.FallbackComponent = props.fallbackComponent || SectionError;
//   }

//   FallbackComponent;

//   // static getDerivedStateFromError(error: any) {
//   //   // Update state so the next render will show the fallback UI.
//   //   return { hasError: true, error };
//   // }

//   componentDidCatch(error, errorInfo) {
//     this.setState({
//       error,
//       errorInfo,
//     });
//   }

//   render() {
//     if (this.state.error) {
//       return (
//         <this.FallbackComponent
//           featureName={this.props.featureName}
//           onRetry={this.props.onRetry}
//           error={this.state.error.toString()}
//         >
//           {process.env.NODE_ENV !== 'production' && this.state.errorInfo && (
//             <details style={{ whiteSpace: 'pre-wrap' }}>
//               {this.state.errorInfo.componentStack}
//             </details>
//           )}
//         </this.FallbackComponent>
//       );
//     }
//     return this.props.children;
//   }
// }

const withFallback = (WrappedComponent) => {
  class withFallback extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // hasError: false,

        errorMessage: '',
        stack: '',
        customError: getInjectWithFallback(),
      };
    }

    static getDerivedStateFromError(error) {
      console.log(error);

      return {
        errorMessage: error.message,
        stack: error.stack,
      };
    }

    render() {
      console.log(this.props);
      if (this.state.errorMessage) {
        // You can render any custom fallback UI
        return (
          <div>
            {/* <h1>Something went wrong.</h1> */}
            {/* <h2>{this.state.error}</h2> */}
            {this.state.customError.ebProps ? (
              this.state.customError?.ebProps?.errorMessage({
                errorMessage: this.state.errorMessage,
                stack: this.state.stack,
              })
            ) : (
              <ErrorTemplate
                error={{
                  errorMessage: this.state.errorMessage,
                  stack: this.state.stack,
                }}
              />
            )}

            {/* <div style={{ color: 'blue' }}>{this.state.error?.message}</div> */}
            {/* <div>{this.state.error?.stack}</div> */}
          </div>
        );
      }
      // if (this.state.customError.ebProps) {
      //   // You can render any custom fallback UI
      //   return (
      //     <div>
      //       <h1>Something went wrong.</h1>
      //       <h2>{this.state.customError.ebProps.featureName}</h2>
      //       <div style={{ color: 'blue' }}>
      //         {this.state.customError.ebProps.errorMessage}
      //       </div>
      //       <div>{this.state.error?.stack}</div>
      //     </div>
      //   );
      // }

      return <WrappedComponent {...this.props} />;
    }
  }

  return withFallback;
};
export default withFallback;
