import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VisitedSpotsCollection. It encapsulates state and variable values for Spot.
 */
class VisitedSpotsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VisitedSpotsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      visited: Boolean,
      spotID: String,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the VisitedSpotsCollection.
 * @type {VisitedSpotsCollection}
 */
export const VisitedSpots = new VisitedSpotsCollection();
