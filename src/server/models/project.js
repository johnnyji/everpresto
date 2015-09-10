import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  name: String,
  manager: { type: Object, required: true },
  budgetInCents: Number,
  endDate: Date,
  startDate: Date,
  assignees: { type: Array, required: true },
  archived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

export default mongoose.model('Project', ProjectSchema);