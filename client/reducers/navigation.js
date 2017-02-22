import {
  UPDATE_NAV_ACTIVE,
} from '../constants';

const initialState = {
  navActive: false,
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAV_ACTIVE:
      return {
        ...state,
        navActive: action.payload,
      };
    default:
      return state;
  }
};

export default navigation;
