import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { updateNavActive } from '../actions/navigation';

class Header extends Component {
  constructor(props) {
    super(props);

    this.hamburgerClicked = this.hamburgerClicked.bind(this);
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

  hamburgerClicked() {
    const { onUpdateNavActive, navActive } = this.props;

    onUpdateNavActive(!navActive);
  }
 
  render() {
    const { users, navActive } = this.props;

    return (
      <header className="AppHeader">
        <h1 className="AppHeader-logo">THIS IS PROPERTY</h1>
        <nav className="AppHeader-nav">
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

const mapStateToProps = (state) => ({
  navActive: state.navigation.navActive,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateNavActive(active) {
    dispatch(updateNavActive(active));
  },
});

const meteorContainer = createContainer(() => {
  Meteor.subscribe('currentUser');
  return {
    userId: Meteor.userId(),
  };
}, Header);

export default connect(mapStateToProps, mapDispatchToProps)(meteorContainer);
