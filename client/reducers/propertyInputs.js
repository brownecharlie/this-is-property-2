import {
  UPDATE_MIN_PRICE,
  UPDATE_MAX_PRICE,
  UPDATE_MIN_BEDS,
  UPDATE_MAX_BEDS,
  UPDATE_LOCATION,
  UPDATE_RADIUS,
  UPDATE_TYPE,
  UPDATE_ORDER_BY,
} from '../constants';

const initialState = {
  minPrice: 0,
  maxPrice: 0,
  minBeds: 0,
  maxBeds: 0,
  location: '',
  radius: 0,
  type: 'houses',
  orderBy: 'price',
};

const propertyInputs = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload,
      };
    case UPDATE_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload,
      };
    case UPDATE_MIN_BEDS:
      return {
        ...state,
        minBeds: action.payload,
      };
    case UPDATE_MAX_BEDS:
      return {
        ...state,
        maxBeds: action.payload,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case UPDATE_RADIUS:
      return {
        ...state,
        radius: action.payload,
      };
    case UPDATE_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case UPDATE_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload,
      };
    default:
      return state;
  }
};

export default propertyInputs;
