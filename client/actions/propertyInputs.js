import {
  UPDATE_MIN_PRICE,
  UPDATE_MAX_PRICE,
  UPDATE_MIN_BEDS,
  UPDATE_LOCATION,
  UPDATE_RADIUS,
  UPDATE_TYPE,
  UPDATE_ORDER_BY,
} from '../constants';

export function updateMinPrice(price) {
  return {
    type: UPDATE_MIN_PRICE,
    payload: price,
  };
}

export function updateMaxPrice(price) {
  return {
    type: UPDATE_MAX_PRICE,
    payload: price,
  };
}

export function updateMinBeds(beds) {
  return {
    type: UPDATE_MIN_BEDS,
    payload: beds,
  };
}

export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: location,
  };
}

export function updateRadius(radius) {
  return {
    type: UPDATE_RADIUS,
    payload: radius,
  };
}

export function updateType(type) {
  return {
    type: UPDATE_TYPE,
    payload: type,
  };
}

export function updateOrderBy(orderBy) {
  return {
    type: UPDATE_ORDER_BY,
    payload: orderBy,
  };
}