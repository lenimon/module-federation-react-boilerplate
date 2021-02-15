// import connectedCard from '../../containers/ConnectedCard';
import errorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import {
  setUseInjectSaga,
  setUseInjectReducer,
  setInjectWithFallback,
} from '../../containers/config';
export default function getConnectedCard({
  useInjectSaga,
  useInjectReducer,
  injectedFallback,
}) {
  setUseInjectSaga(useInjectSaga);
  setUseInjectReducer(useInjectReducer);
  setInjectWithFallback(
    injectedFallback.fallbackProps,
  );
  return errorBoundary;
}
