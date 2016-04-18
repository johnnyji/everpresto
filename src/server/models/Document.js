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

      // Finds the creator of the documents (aka. current user)
      const creator = User.findById(docs[0]._creator, (err, creator) => {
        if (err) return reject(err);
        // Sends emails out to signers
        DocumentMailer.sendInitialEmails(
          docs.map((doc) => doc.toObject()),
          creator.toObject()
        );
      });

      Collection.findWithDocuments(docs[0]._collection.toString())
        .then(resolve)
        .catch(reject);
    });
  });
};

export default mongoose.model('Document', DocumentSchema);
