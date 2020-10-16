import { createSelector } from 'reselect';
import { initialState, SimpleCardData } from './reducer';
import { SEL_KEY } from './constants';

/**
 * Direct selector to the simpleCard state domain
 */

export const loadSimpleCard = (state: SimpleCardData) =>{
  return state[SEL_KEY] || initialState;
}

export const makeSelectSimpleCard = createSelector(loadSimpleCard, (data) => data);
