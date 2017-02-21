import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Home from './views/Home';
import About from './views/About';
import Login from './views/Login';
import Register from './views/Register';
import Admin from './views/Admin';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.requireAuth = this.requireAuth.bind(this);
    this.checkIsUserLoggedIn = this.checkIsUserLoggedIn.bind(this);
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

  checkIsUserLoggedIn(nextState, replace, callback) {
    if (Meteor.userId()) {
      replace({ pathname: '/' });
    }
    callback();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} onEnter={this.checkIsUserLoggedIn} />
          <Route path="/register" component={Register} onEnter={this.checkIsUserLoggedIn} />
          <Route path="/admin" component={Admin} onEnter={this.requireAuth} />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;