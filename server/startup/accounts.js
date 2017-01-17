if (Meteor.users.find().fetch().length === 0) {
  const users = [
    { name: 'Scott Ashmore', email: 'dev.scottashmore@gmail.com', roles: ['admin'] },
    { name: 'Charlie Browne', email: 'brownech@tcd.ie', roles: ['admin'] },
  ];

  users.forEach(user => {
    const id = Accounts.createUser({
      email: user.email,
      password: 'thisisproperty123',
      profile: {
        name: user.name
      } 
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles); 
    }
  });
}