import {
  UPDATE_LISTINGS,
} from '../constants';

const initialState = {};

const propertyListings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LISTINGS:
      return action.payload
    default:
      return state;
  }
};

export default propertyListings;
