import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let timesheetSchema = new Schema({
  email: String,
  note: String,
  workType: String,
  timeInSeconds: Number
});

export default mongoose.model('timesheet', timesheetSchema);