import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The SpotsCollection. It encapsulates state and variable values for Spot.
 */
class SpotsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SpotsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      address: String,
      owner: String,
      spotType: {
        type: String,
        allowedValues: ['beach', 'hike', 'library'],
        defaultValue: 'good',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SpotsCollection.
 * @type {SpotsCollection}
 */
export const Spots = new SpotsCollection();
