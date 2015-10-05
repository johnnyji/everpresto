import mongoose from 'mongoose';

let GroupSchema = mongoose.Schema({
  name: { type: String, required: true },
  memberIds: { type: Array, default: [] },
  ownerId: String
});

let Group = mongoose.model('Group', GroupSchema);

export default Group;