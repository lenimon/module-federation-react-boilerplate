import * as React from 'react';
/**
 *
 * Card Component
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { getUseInjectSaga, getUseInjectReducer } from '../config';
import reducer from './reducer';
import { SEL_KEY } from './constants';
import saga from './saga';
import SimpleCard, { ActionProps, DataProps } from '../../components/SimpleCard';
import { click } from './actions';
import {
  makeSelectSimpleCard,
} from './selectors';

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
          refSimpleCard?.current?.onClickBtn();
        },
      });
    }
  }, [refSimpleCard.current]);

  return (
    <SimpleCard
      {...props}
      simpleCardRef={refSimpleCard}
    />
  );
}

const mapStateToProps: (state) => DataProps = createStructuredSelector({
  [SEL_KEY]: makeSelectSimpleCard
});

function mapDispatchToProps(dispatch): ActionProps {
  return bindActionCreators(
    {
      click
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withComposed = compose(withConnect)(ConnectedCard);

export default withComposed;
