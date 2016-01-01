import _ from 'lodash';
import mongoose from 'mongoose';
import {toObjects} from '.././routes/utils/ResponseHelper';
// Models must be imported from their direct source file due to cross-model dependency issues. See README
import Document from './Document';

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const CollectionSchema = new Schema({
  _company: {
    type: SchemaObjectId,
    required: true,
    index: true
  },
  _creator: {
    // This references to the `User` that created the template
    type: SchemaObjectId,
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Untitled',
    required: 'Please provide a title for your folder.'
  }
}, {
  timestamps: true
});

// Removes dependency documents.
CollectionSchema.pre('remove', function(next) {
  Document.remove({_collection: this._id}, (err) => {
    // Must pass in an `Error` object on error, cannot be String.
    if (err) {
      const errMessage = new Error('Server Error: Unable to remove documents in this collection :(');
      return next(errMessage);
    }
    next();
  });
});

// Finds a collection and sets it's documents as an attribute on itself.
CollectionSchema.statics.findWithDocuments = function(stringId) {
  return new Promise((resolve, reject) => {
    this.findById(ObjectId(stringId), (err, collection) => {
      if (err) return reject(err);
      if (!collection) return reject('Hmmm... This collection doesn\'t exist for some reason');
      Document.find({_collection: collection._id}, (err, documents) => {
        if (err) return reject(err);
        // Sets the the collection's documents as an attribute on the collection
        // and returns the collection
        resolve(_.set(collection.toObject(), 'documents', toObjects(documents)));
      });
    });
  });
};

export default mongoose.model('Collection', CollectionSchema);