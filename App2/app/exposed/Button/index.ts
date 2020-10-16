import ButtonComponent from '../../components/Button';
import * as React from 'react';

export default function getRemoteButton() {
  console.log('composing and returning ButtonComponent');
  return React.memo(ButtonComponent);
}
