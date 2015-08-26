import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Timesheet = mongoose.model('Timesheet', new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  note: String,
  workType: String,
  timeInSeconds: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}));

export default Timesheet;