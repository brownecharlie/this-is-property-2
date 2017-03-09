import { createStore, combineReducers } from 'redux';

import propertyInputs from './reducers/propertyInputs';
import purchaseInputs from './reducers/purchaseInputs';
import mortgageInputs from './reducers/mortgageInputs';
import propertySearch from './reducers/propertySearch';
import navigation from './reducers/navigation';

const reducer = combineReducers({
  propertyInputs,
  purchaseInputs,
  mortgageInputs,
  propertySearch,
  navigation,
});

const store = createStore(reducer);

window.store = store;

export default store;