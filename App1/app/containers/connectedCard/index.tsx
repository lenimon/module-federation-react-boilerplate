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
  useInjectReducer({ key: 'simplecard', reducer });
  useInjectSaga({ key: 'simplecard', saga });

  React.useEffect(()=>{console.log("connected_card")},[props.simplecardData])

  return (
    <SimpleCard
      {...props}
    />
  );
}

const mapStateToProps: (state) => DataProps = createStructuredSelector({
  simplecardData: makeSelectSimpleCard
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
