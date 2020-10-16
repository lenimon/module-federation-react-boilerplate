import { createSelector } from 'reselect';
import { initialState, SimpleCardData } from './reducer';

/**
 * Direct selector to the simpleCard state domain
 */

export const loadSimpleCard = (state: SimpleCardData) =>{
  return state.simplecard || initialState;
}

export const makeSelectSimpleCard = createSelector(loadSimpleCard, (data) => data);
