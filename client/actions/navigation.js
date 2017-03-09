import {
  UPDATE_NAV_ACTIVE,
  UPDATE_APP_LOADING,
} from '../constants';

export function updateNavActive(active) {
  return {
    type: UPDATE_NAV_ACTIVE,
    payload: active,
  };
}

export function updateAppLoading(isLoading) {
  return {
    type: UPDATE_APP_LOADING,
    payload: isLoading,
  };
}