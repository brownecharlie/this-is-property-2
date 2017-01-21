import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import AccountsUIWrapper from './Accounts';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  get adminLink() {
    if (Roles.userIsInRole(this.props.userId, ['admin'])) {
      return <Link to="/admin">Admin</Link>
    }
    return null;
  }
 
  render() {
    const { users } = this.props;

    return (
      <header className="AppHeader">
        <AccountsUIWrapper />
        <nav>
          <Link to="/">Home </Link>
          <Link to="/about">About </Link>
          <Link to="/login">Login </Link>
          {this.adminLink}
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  userId: PropTypes.string,
};

export default createContainer(() => {
  Meteor.subscribe('currentUser');

  return {
    userId: Meteor.userId(),
  };
}, Header);