import TimesheetValidator from '.././validators/timesheetValidator';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Validator = new TimesheetValidator();

let TimesheetSchema = new Schema({
  email: String,
  note: String,
  workType: String,
  timeInSeconds: Number,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

Timesheet.schema.path('email').validate(Validator.validateEmail, 'Invalid email format');
Timesheet.schema.path('email').validate(Validator.timeInSeconds, 'Time cannot be greater than 24 hours');

export default mongoose.model('Timesheet', TimesheetSchema);