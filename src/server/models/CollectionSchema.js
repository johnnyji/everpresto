import mongoose from 'mongoose';

const {model, Schema} = mongoose.Schema;
const {ObjectId} = Schema.Types;
const Document = model('Document');

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