import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function (options, user) {
  // TOTO: Send welcome email to user.
  console.log(user);
  return user;
});