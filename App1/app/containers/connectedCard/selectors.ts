import { createSelector } from 'reselect';
import { State } from '../../reducers';
import { initialState } from './reducer';
/**
 * Direct selector to the simpleCard state domain
 */

export const loadSimpleCard = (state: State) =>{
  return state.simplecardData || initialState;
}

export const makeSelectSimpleCard = createSelector(loadSimpleCard, (data) => data);
