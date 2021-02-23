import * as React from 'react';
/**
 *
 * Card Component
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import ErrorBoundary from 'components/ErrorBoundary';
import withFallback from 'utils/withFallback';
import {
  getUseInjectSaga,
  getUseInjectReducer,
  getInjectWithFallback,
} from '../config';
import reducer from './reducer';
import { SEL_KEY } from './constants';
import saga from './saga';
import SimpleCard, {
  ActionProps,
  DataProps,
} from '../../components/SimpleCard';
import { click } from './actions';
import { makeSelectSimpleCard } from './selectors';

// const fallbackData = React.lazy(() => getInjectWithFallback());

function ConnectedCard(props) {
  const useInjectReducer = getUseInjectReducer();
  const useInjectSaga = getUseInjectSaga();
  // eslint-disable-line
  useInjectReducer({ key: SEL_KEY, reducer });
  useInjectSaga({ key: SEL_KEY, saga });
  const refSimpleCard = React.useRef(null);

  React.useEffect(() => {
    if (refSimpleCard.current) {
      props.getExposedMethods({
        exposedOnClick: () => {
          if (refSimpleCard.current.onClickBtn) {
            refSimpleCard.current.onClickBtn();
          }
        },
      });
    }
  }, [refSimpleCard.current]);

  return <SimpleCard {...props} simpleCardRef={refSimpleCard} />;
}

const mapStateToProps: (state) => DataProps = createStructuredSelector({
  [SEL_KEY]: makeSelectSimpleCard,
});

function mapDispatchToProps(dispatch): ActionProps {
  return bindActionCreators(
    {
      click,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withComposed = compose(withConnect, withFallback)(ConnectedCard);

export default withComposed;

// function ConnectedCardWithEB() {
//   const [ebProps, setEbProps] = React.useState({
//     featureName: 'default',
//     errorMessage: 'default error message',
//   });
//   React.useEffect(() => {
//     const injectedEBProps = getInjectWithFallback();
//     setEbProps({
//       featureName: injectedEBProps.featureName,
//       errorMessage: injectedEBProps.errorMessage,
//     });
//   }, []);

//   return <ErrorBoundary ebProps={ebProps}>{withComposed}</ErrorBoundary>;
// }

// export default ConnectedCardWithEB;
