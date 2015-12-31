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


// CollectionSchema.static.getPreviews = function(companyIdString) {
//   return new Promise((resolve, reject) => {
//     this
//       .find({_company: ObjectId(companyIdString)})
//       .sort({createdAt: -1})
//       .exec((err, collections) => {
//         if (err) return reject(err);
//         if (collections.length === 0) return resolve(collections);

//         // Converts each collection to an object and adds the document count as well.
//         return collections.map((collection) => {
//           collection = collection.toObject();
//           Document.count({_})
//         });
//       });
//   });
// }

// TODO: Make sure that we retrieve the amount of documents associated with the collection


export default mongoose.model('Collection', CollectionSchema);