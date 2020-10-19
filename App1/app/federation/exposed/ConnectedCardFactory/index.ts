import connectedCard from '../../../containers/ConnectedCard';
import { setUseInjectSaga, setUseInjectReducer } from '../../../containers/config'
export default function getConnectedCard({
  useInjectSaga,
  useInjectReducer
}) {
  setUseInjectSaga(useInjectSaga);
  setUseInjectReducer(useInjectReducer);
  return connectedCard;
}
