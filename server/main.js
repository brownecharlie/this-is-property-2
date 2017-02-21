const email = encodeURIComponent('dev.scottashmore@gmail.com');

Meteor.startup(() => {
  process.env.MAIL_URL = `smtp://${email}:13-cheese-ass@smtp.gmail.com:465`;
});