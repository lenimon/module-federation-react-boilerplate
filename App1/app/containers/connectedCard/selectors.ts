import { createSelector } from 'reselect';
import { State } from '../../reducers';
import { initialState } from './reducer'
/**
 * Direct selector to the simpleCard state domain
 */

export const loadSimpleCard = (state: State) =>{
  return state.simpleCard || initialState;
}

export const makeSelectSimpleCard: (arg0: void) => (arg0: State) => any = () =>
  createSelector(loadSimpleCard, (simpleCard) => simpleCard);
