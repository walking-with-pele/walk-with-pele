import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Spots } from '../../api/spot/Spots.js';
import { Profiles } from '../../api/profile/Profiles.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addSpot(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Spots.collection.insert(data);
}
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

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
