import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CollectionSchema = new Schema({
  _company: {
    type: ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  _creator: {
    type: ObjectId,
    ref: 'User',
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

// Must export prior to declaring and using other models due to dependency and loading issues.
export default mongoose.model('Collection', CollectionSchema);

const Document = mongoose.model('Document');

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

export default CollectionSchema;