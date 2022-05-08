import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots.js';
import { Profiles } from '../../api/profile/Profiles.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addSpot(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Spots.collection.insert(data);
}
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the SpotsCollection if empty.
if (Spots.collection.find().count() === 0) {
  if (Meteor.settings.defaultSpots) {
    console.log('Creating default data for spots.');
    Meteor.settings.defaultSpots.map(data => addSpot(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default data for profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}
