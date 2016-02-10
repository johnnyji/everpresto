import mongoose from 'mongoose';

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
  status: {
    type: String,
    enum: ['draft', 'sent', 'signed'],
    default: 'draft'
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