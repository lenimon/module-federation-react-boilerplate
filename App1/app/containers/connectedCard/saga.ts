import { put, takeLatest, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  CLICK
} from './constants';

import {
  load
} from './actions';

import {
  loadSimpleCard
} from './selectors';

function* onClick(obj): SagaIterator<void> {
  try {
    const simplecardData = yield select(loadSimpleCard);
    /** load key and def */
    yield put(load({keyword:obj.payload.keyword+"_saga", defenition:obj.payload.defenition+"_saga"}));
  } catch (e) {
    console.log(e)
  }
}

// watcher
export default function* keyDefSaga(): Iterable<Effect> {
  yield takeLatest(CLICK, onClick);
}
