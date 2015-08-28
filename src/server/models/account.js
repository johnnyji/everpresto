import AccountValidator from '.././validators/accountValidator';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Validator = new AccountValidator();

let Account = mongoose.model('Account', new Schema({
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
}));

Account.schema.path('email').validate(Validator.validateEmail, 'Invalid Email Format');


export default Account;