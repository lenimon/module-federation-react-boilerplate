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
export function setInjectWithFallback(injectedEbProps) {
  injectWithFallback = injectedEbProps;
}
export function getInjectWithFallback() {
  return (
    injectWithFallback || {
      ebProps: null,
    }
  );
}
