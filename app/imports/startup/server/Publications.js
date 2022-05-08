import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Spots } from '../../api/spot/Spots';
import { Comments } from '../../api/comment/Comments';
import { Likes } from '../../api/like/Likes';
import { VisitedSpots } from '../../api/visitedSpot/VisitedSpots';
import { Profiles } from '../../api/profile/Profiles';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Spots.userPublicationName, function () {
  if (this.userId) {
    return Spots.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Likes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Likes.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(VisitedSpots.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return VisitedSpots.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find({});
  }
  return this.ready();
});
// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Spots.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Spots.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
