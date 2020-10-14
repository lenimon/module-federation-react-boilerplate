/*
 *
 * Household reducer
 *
 */
import produce from 'immer';
import {
  LOAD
} from './constants';

export type SimpleCard = {
  keyword: string;
  defenition: string;
};

export const initialState = {
  keyword: "Init Key",
  defenition: "Init Def"
};

/* eslint-disable default-case, no-param-reassign */
const simplecardReducer = (
  state: SimpleCard = initialState,
  action,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD: {
        draft.keyword = action.payload.keyword;
        draft.defenition = action.payload.defenition;
        break;
      }
    }
  });

export default simplecardReducer;
