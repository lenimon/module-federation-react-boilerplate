import ConnectedCard from 'containers/ConnectedCard';
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
  setInjectWithFallback(injectedFallback);
  return () => ConnectedCard;
}
