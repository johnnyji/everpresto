import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  _company: {
    type: ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  _collection: {
    type: ObjectId,
    ref: 'Collection',
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
  signed: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Untitled Folder',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Document', DocumentSchema);