import {
  UPDATE_LISTING,
  UPDATE_ADMIN_DISTRICT,
  UPDATE_REGION,
  UPDATE_FIVE_YEAR_GROWTH,
} from '../constants';

const initialState = {
  listing: {},
  adminDistrict: null,
  region: null,
  fiveYearGrowth: 0,
};

const propertySearch = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LISTING:
      return {
        ...state,
        listing: action.payload,
      };
    case UPDATE_ADMIN_DISTRICT:
      return {
        ...state,
        adminDistrict: action.payload,
      };
    case UPDATE_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case UPDATE_FIVE_YEAR_GROWTH:
      return {
        ...state,
        fiveYearGrowth: action.payload,
      };
    default:
      return state;
  }
};

export default propertySearch;