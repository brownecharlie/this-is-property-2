Meteor.publish('currentUser', function () {
  return Meteor.users.find({ _id: this.userId });
});

Meteor.publish('allUsers', function(){
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find();
  }
  return null;
});