import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const CollectionSchema = new Schema({
  _owner: {
    type: ObjectId,
    ref: 'User',
    index: true
  },
  documents: [{
    type: ObjectId,
    ref: 'Document'
  }],
  title: {
    type: String,
    default: 'Untitled',
    required: 'Please provide a title for your folder.'
  }
}, {
  timestamps: true
});

export default mongoose.model('Collection', CollectionSchema);