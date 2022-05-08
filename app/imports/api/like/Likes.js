import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The LikesCollection. It encapsulates state and variable values for Spot.
 */
class LikesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'LikesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      like: Boolean,
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
 * The singleton instance of the LikesCollection.
 * @type {LikesCollection}
 */
export const Likes = new LikesCollection();
