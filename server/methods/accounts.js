import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  createNewUser({ firstName, lastName, email, password, roles }) {
    const id = Accounts.createUser({
      email: email,
      password: password,
      profile: {
        name: `${firstName} ${lastName}`,
      },
    });

    if (roles.length > 0) Roles.addUsersToRoles(id, roles);

    Accounts.sendVerificationEmail(id);
  },

  sendPasswordResetEmail() {
    Accounts.sendResetPasswordEmail(this.userId);
  }
});