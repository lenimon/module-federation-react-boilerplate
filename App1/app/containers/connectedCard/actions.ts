/*
 *
 * Simplecard actions
 *
 */

import {
  LOAD,
  CLICK
} from './constants';

export function load(payload: {
  keyword: string;
  defenition: string;
}) {
  return {
    type: LOAD,
    payload,
  };
}

export function click(payload: {
  keyword: string;
  defenition: string;
}) {
  return {
    type: CLICK,
    payload,
  };
}
