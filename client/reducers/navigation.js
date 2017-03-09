import {
  UPDATE_NAV_ACTIVE,
  UPDATE_APP_LOADING,
} from '../constants';

const initialState = {
  navActive: false,
  appLoading: true,
};

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAV_ACTIVE:
      return {
        ...state,
        navActive: action.payload,
      };
    case UPDATE_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };
    default:
      return state;
  }
};

export default navigation;
