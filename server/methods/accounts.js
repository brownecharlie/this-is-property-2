import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  newUser({ name, email, password, roles }) {
    const id = Accounts.createUser({
      email: email,
      password: password,
      profile: {
        name: name
      } 
    });

    if (roles.length > 0) Roles.addUsersToRoles(id, roles);
  }
});