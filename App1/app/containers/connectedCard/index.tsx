import * as React from 'react';
/**
 *
 * Card Component
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
// import {withFallback} from 'utils/withFallback';
import {
  getUseInjectSaga,
  getUseInjectReducer,
  getInjectWithFallback,
} from '../config';
// import ErrorBoundary from 'components/SectionError';
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
      throw Error('Thrown from useEffect');
    }
  }, [refSimpleCard.current]);

  return (
      <SimpleCard {...props} simpleCardRef={refSimpleCard} />
  );
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

// const { withFallback } = getInjectWithFallback();
// const fallbackProps = getInjectWithFallback().fallbackProps
//   ? getInjectWithFallback().fallbackProps
//   : {
//     featureName: 'App1 Card(Remote)',
//     fallbackComponent: () => <p>oops, something went wrong app 1</p>,
//   };
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withComposed = compose(
  withConnect,
  // withFallback(fallbackProps)
)(ConnectedCard);

export default withComposed;
