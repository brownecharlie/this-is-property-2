import {
  UPDATE_NAV_ACTIVE,
} from '../constants';

export function updateNavActive(active) {
  return {
    type: UPDATE_NAV_ACTIVE,
    payload: active,
  };
}