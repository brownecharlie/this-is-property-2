import {
  UPDATE_LISTINGS,
} from '../constants';

export function updateListings(propertyListings) {
  return {
    type: UPDATE_LISTINGS,
    payload: propertyListings,
  };
}