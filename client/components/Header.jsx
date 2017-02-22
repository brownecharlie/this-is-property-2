import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

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
    this.setState({ active: !this.state.active });
  }
 
  render() {
    const { users } = this.props;
    const { active } = this.state;

    return (
      <header className={`AppHeader ${active ? 'active' : ''}`}>
        <nav className="AppHeader-nav">
          <div className="navHamburger" onClick={this.hamburgerClicked}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="navLinks">
            <Link to="/">Home </Link>
            <Link to="/about">About </Link>
            {this.loginLink}
            {this.adminLink}
          </div>
        </nav>
        <h1 className="AppHeader-logo">THIS IS PROPERTY</h1>
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