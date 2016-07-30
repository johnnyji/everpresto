import isEmail from 'validator/lib/isEmail';
import mongoose from 'mongoose';
import uuid from 'node-uuid';
// Models must be imported from their direct source file due to cross-model dependency issues. See README

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  _company: {
    type: SchemaObjectId,
    required: [true, 'This document must container a `_company` ID'],
    index: true
  },
  _collection: {
    type: SchemaObjectId,
    required: [true, 'This document must container a `_collection` ID'],
    index: true
  },
  _creator: {
    type: SchemaObjectId,
    required: [true, 'This document must container a `_creator` user ID'],
    index: true
  },
  body: {
    type: String,
    default: 'Untitled Folder',
    required: [true, 'This document must contain a body']
  },
  error: {
    type: String
  },
  signer: {
    email: {
      type: String,
      required: 'What was your email again?',
      validate: [isEmail, '{VALUE} doesn\'t seem like a valid email...']
    },
    firstName: {
      type: String,
      required: [true, 'Please provide a first name for the signer']
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name for the signer']
    }
  },
  status: {
    type: String,
    enum: ['created', 'sent', 'signed'],
    default: 'created'
  },
  signatureLinkToken: {
    type: String,
    required: [true, 'Unable to generate a signature link token']
  },
  // TODO: Give an option for the user to set an expiry date on the front-end
  signatureLinkTokenExpiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

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
        },
        // TODO: Implement stronger token generation
        signatureLinkToken: uuid.v4()
      };
    });

    this.create(whitelistedDocs, (err, docs) => {
      if (err) return reject(err);
      resolve(docs.map((doc) => doc.toObject()));
    });
  });
};

/**
 * handleCreate writes a document to the database
 * @param {Object} doc - The document object we're creating
 * @param {String} companyId - The id of the company this document belongs to
 * @param {String} userId - The id of the user that created this document
 * @returns {Promise} - The observable stream of whether or not the save was successful
 */
DocumentSchema.statics.handleCreate = function(doc, companyId, userId) {
  return new Promise((resolve, reject) => {
    // Whitelists the document object
    const whitelistedDoc = {
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

    this.create(whitelistedDoc, (err, doc) => {
      if (err) return reject(err);
      resolve(doc.toObject());
    });
  });
};

export default mongoose.model('Document', DocumentSchema);
