import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Router from './components/Router';

import store from './store';

import './startup/accountsConfig';
 
Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  );
});