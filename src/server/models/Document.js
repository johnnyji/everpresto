import mongoose from 'mongoose';
import Collection from './Collection';
import DocumentMailer from '../services/mailers/DocumentMailer';
import UserValidator from '../validators/UserValidator';
// Models must be imported from their direct source file due to cross-model dependency issues. See README
import User from './User';

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
  error: {
    type: String
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

// DocumentSchema.pre('save', sendEmail);
// DocumentSchema.post('save', emitSocketEmailCount);

/**
 * Batch creates a an array of documents at once
 * @param {array} docs - The list of documents being created
 * @param {string} companyId - The id of the company these documents belong to
 * @param {string} userId - The id of the user that created these documents
 * @return {object} - A promise object that contains the result of creating all the documents
 */
DocumentSchema.statics.handleCreateBatch = function(docs, companyId, userId) {
  return new Promise((resolve, reject) => {
    // Whitelists the documents to remove any harmful data from being
    // written to the DB
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

/**
 * Adds an error message to each unsent doc and ensure their `status` is `created`
 * @param {array} unsentDocs - Documents that weren't properly emailed to their signers
 */
DocumentSchema.statics.handleUnsentDocs = function(unsentDocs) {
  unsentDocs.forEach((doc) => {
    // TODO: Is `this` referring to the DocumentSchema in those scope?
  });
};

export default mongoose.model('Document', DocumentSchema);
