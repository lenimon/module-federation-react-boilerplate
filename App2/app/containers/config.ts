import { withFallback } from 'utils/withFallback';
import { useInjectSaga } from '../utils/injectSaga';
import { useInjectReducer } from '../utils/injectReducer';
let injectSaga;
let injectReducer;
let injectWithFallback;

export function setUseInjectSaga(sagaUtil) {
  injectSaga = sagaUtil;
}
export function getUseInjectSaga() {
  return injectSaga || useInjectSaga;
}
export function setUseInjectReducer(reducerUtil) {
  injectReducer = reducerUtil;
}
export function getUseInjectReducer() {
  return injectReducer || useInjectReducer;
}
export function setInjectWithFallback( fallbackProps) {
  injectWithFallback = {  fallbackProps };
}
export function getInjectWithFallback() {
  return injectWithFallback || { withFallback, fallbackProps: null };
}
