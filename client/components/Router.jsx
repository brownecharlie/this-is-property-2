import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Home from './views/Home';
import About from './views/About';
import Login from './views/Login';
import Admin from './views/Admin';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace, callback) {
    Meteor.subscribe('currentUser', {
      onReady() {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          replace({ pathname: '/' });
        }
        callback();
      },
      onError(err) { 
        console.error('--[ REQUIRE AUTH ERROR ]--', err); 
      }
    });
  };

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} onEnter={this.requireAuth} />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;