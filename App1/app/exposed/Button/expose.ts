import ButtonComponent from '../../components/Button';
import { memo } from 'react';

export default function getRemoteButton() {
  console.log('composing and returning ButtonComponent');
  return memo(ButtonComponent);
}
