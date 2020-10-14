import { useInjectSaga } from '../utils/injectSaga';
import { useInjectReducer } from '../utils/injectReducer';

let injectSaga;
let injectReducer;

export function setUseInjectSaga(sagaUtil) {
  injectSaga = sagaUtil;
}

export function getUseInjectSaga() {
  return injectSaga || useInjectSaga;
}

export function setUseInjectReducer(reducerUtil) {
  debugger;
  injectReducer = reducerUtil;
}

export function getUseInjectReducer() {
  return injectReducer || useInjectReducer;
}
