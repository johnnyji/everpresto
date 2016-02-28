import mongoose from 'mongoose';
import UserValidator from '.././validators';

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
    index: true
  },
  body: {
    type: String,
    default: 'Untitled Folder',
    required: true
  },
  expiresAt: {
    type: Date
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
  }
  status: {
    type: String,
    enum: ['draft', 'sent', 'signed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

export default mongoose.model('Document', DocumentSchema);