import UserValidator from '.././validators/userValidator';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
const Validator = new UserValidator();

let UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false }
});

User.plugin(passportLocalMongoose, { usernameField: 'email' })

// User.schema.path('email').validate(Validator.validateEmail, 'Invalid Email Format');


// STATIC METHODS

UserSchema.statics.findByEmail((email) => {
  return new Promise((resolve, reject) => { // no need to .bind(this), using arrow func
    this.findOne({ email: email }, (err, user) => {
      if (err) { reject(err); }
      resolve(user);
    });
  });
});

UserSchema.statics.createNew((user) => {
  let user = new User({
    email: user.email,
    password: user.password
  });
  return new Promise((resolve, reject) => {
    user.save(err => err ? reject(err) : resolve(user));
  });
});

UserSchema.statics.findAndAuthenticate((userParams) => {
  return new Promise((resolve, reject) => {
    user = this.findOne({ email: userParams.email }, (err, user) => {
      if (err) reject(err);
      if (!user || user.password !== userParams.password) {
        reject('Invalid username/password.');
      }
      resolve(user);
    });
  });
});

export default mongoose.model('User', UserSchema);