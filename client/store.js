import { createStore, combineReducers } from 'redux';

import propertyInputs from './reducers/propertyInputs';
import purchaseInputs from './reducers/purchaseInputs';
import mortgageInputs from './reducers/mortgageInputs';
import propertyListings from './reducers/propertyListings';
import navigation from './reducers/navigation';

const reducer = combineReducers({
  propertyInputs,
  purchaseInputs,
  mortgageInputs,
  propertyListings,
  navigation,
});

const store = createStore(reducer);

window.store = store;

export default store;