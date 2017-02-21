import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  get usernamesAndEmails() {
    const { users } = this.props;

    return users.map((user, index) => {
      let email;
      let verified;
      if (user.services.facebook) {
        email = user.services.facebook.email;
        verified = true;
      } else {
        email = user.emails[0].address;
        verified = user.emails[0].verified;
      }

      return (
        <li key={index} className="Admin-tableRow">
          <ul className="Admin-tableUser">
            <li className="Admin-tableUserItem">Name: {user.profile.name}</li>
            <li className="Admin-tableUserItem">Email: {email}</li>
            <li className="Admin-tableUserItem">Role: {user.roles[0]}</li>
            <li className="Admin-tableUserItem">Verified: {`${verified}`}</li>
          </ul>
        </li>
      );
    });
  }
 
  render() {
    const { users } = this.props;

    return (
      <div className="Admin">
        <ul className="Admin-header">
          <li className="Admin-headerItem">Name</li>
          <li className="Admin-headerItem">Email</li>
          <li className="Admin-headerItem">Role</li>
          <li className="Admin-headerItem">Verified</li>
        </ul>
        <ul className="Admin-table">{this.usernamesAndEmails}</ul>
      </div>
    );
  }
}

Admin.propTypes = {
  users: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('allUsers');

  return {
    users: Meteor.users.find().fetch(),
  };
}, Admin);