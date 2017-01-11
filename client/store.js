import { createStore, combineReducers } from 'redux';

import propertyInputs from './reducers/propertyInputs';
import purchaseInputs from './reducers/purchaseInputs';
import mortgageInputs from './reducers/mortgageInputs';
import propertyListings from './reducers/propertyListings';

const reducer = combineReducers({
  propertyInputs,
  purchaseInputs,
  mortgageInputs,
  propertyListings,
});

const store = createStore(reducer);

window.store = store;

export default store;