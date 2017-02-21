import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

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

  get loginLink() {
    if (this.props.userId) {
      return <a to="/logout" onClick={() => { Meteor.logout(); }}>Log Out </a>
    }
    return <Link to="/login">Log In </Link>;
  }
 
  render() {
    const { users } = this.props;

    return (
      <header className="AppHeader">
        <nav>
          <Link to="/">Home </Link>
          <Link to="/about">About </Link>
          {this.loginLink}
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