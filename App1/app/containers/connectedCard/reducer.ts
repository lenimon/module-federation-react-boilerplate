/*
 *
 * Household reducer
 *
 */
import produce from 'immer';
import { SEL_KEY, LOAD } from './constants';

export type SimpleCardData = {
  'connected/simplecard/DATA'?: CardData;
};

export type CardData = {
  keyword: string;
  defenition: string;
};

export const initialState = {
  keyword: "Init Key",
  defenition: "Init Def"
};

/* eslint-disable default-case, no-param-reassign */
const simplecardReducer = (
  state: CardData = initialState,
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
