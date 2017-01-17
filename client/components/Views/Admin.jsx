import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  get usernamesAndEmails() {
    const { users } = this.props;

    return users.map((user, index) => {
      let email;
      if (user.services.facebook) {
        email = user.services.facebook.email;
      } else {
        email = user.emails[0].address;
      }

      return (
        <li key={index}>
          <div>Username: {user.profile.name}</div>
          <div>Email: {email}</div>
          <hr />
        </li>
      );
    });
  }
 
  render() {
    const { users } = this.props;

    return (
      <div className="Admin">
        this is the admin page!

        <ul>{this.usernamesAndEmails}</ul>
      </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('allUsers');

  return {
    users: Meteor.users.find().fetch(),
  };
}, App);