import mongoose from 'mongoose';
import Promise from 'bluebird';

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

CollectionSchema.statics.updateCollection = function(collectionId, collectionData) {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate({_id: collectionId}, collectionData, {'new': true}, (err, collection) => {
      if (err) reject(err);
      resolve(collection);
    });
  });
};

export default mongoose.model('Collection', CollectionSchema);