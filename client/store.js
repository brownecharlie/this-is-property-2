import { createStore, combineReducers } from 'redux';

import propertyInputs from './reducers/propertyInputs';
import purchaseInputs from './reducers/purchaseInputs';
import propertyListings from './reducers/propertyListings';

const reducer = combineReducers({
  propertyInputs,
  purchaseInputs,
  propertyListings,
});

const store = createStore(reducer);

export default store;