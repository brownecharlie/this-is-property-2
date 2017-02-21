Meteor.publish('currentUser', function () {
  return Meteor.users.find({ _id: this.userId });
});

Meteor.publish('allUsers', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find({}, {
      fields: {
        'profile': 1,
        'emails': 1,
        'services.facebook.email': 1,
        'roles': 1,
      }});
  }
  return null;
});