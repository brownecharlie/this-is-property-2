import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Home from './Views/Home';
import About from './Views/About';
import Admin from './Views/Admin';

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace, callback) {
    Meteor.subscribe('currentUser', {
      onReady: function () {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          replace({ pathname: '/' });
        }
        callback();
      },
      onError: function (err) { 
        console.log('error', err); 
      }
    });
  };

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/about" component={About} />
          <Route path="/admin" component={Admin} onEnter={this.requireAuth} />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;