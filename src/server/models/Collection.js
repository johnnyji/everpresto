import mongoose from 'mongoose';
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

export default mongoose.model('Collection', CollectionSchema);