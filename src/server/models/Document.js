import mongoose from 'mongoose';
import Collection from './Collection';
import UserValidator from '.././validators/UserValidator';

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  _company: {
    type: SchemaObjectId,
    required: true,
    index: true
  },
  _collection: {
    type: SchemaObjectId,
    required: true,
    index: true
  },
  _creator: {
    type: SchemaObjectId,
    required: true,
    index: true
  },
  body: {
    type: String,
    default: 'Untitled Folder',
    required: true
  },
  signer: {
    email: {
      type: String,
      required: 'What was your email again?',
      validate: [UserValidator.email, '{VALUE} doesn\'t seem like a valid email...']
    },
    firstName: {
      type: String,
      required: 'Please provide a first name for the signer'
    },
    lastName: {
      type: String,
      required: 'Please provide a last name for the signer'
    }
  },
  status: {
    type: String,
    enum: ['created', 'sent', 'signed'],
    default: 'created'
  }
}, {
  timestamps: true
});


DocumentSchema.statics.batchCreate = function(docs, companyId, userId) {
  return new Promise((resolve, reject) => {
    const whitelistedDocs = docs.map((doc) => {
      return {
        _company: ObjectId(companyId),
        _collection: ObjectId(doc._collection),
        _creator: ObjectId(userId),
        body: doc.body,
        signer: {
          email: doc.signer.email,
          firstName: doc.signer.firstName,
          lastName: doc.signer.lastName
        }
      };
    });

    this.create(whitelistedDocs, (err, docs) => {
      if (err) return reject(err);

      Collection.findWithDocuments(docs[0]._collection.toString())
        .then(resolve)
        .catch(reject);
    });
  });
};

export default mongoose.model('Document', DocumentSchema);