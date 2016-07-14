import beautifyUnqiue from 'mongoose-beautiful-unique-validation';
import isEmail from 'validator/lib/isEmail';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import config from '../../.././config/config';
// Models must be imported from their direct source file due to cross-model dependency issues. See README
import Company from './Company';
import Promise from 'bluebird';

const ObjectId = mongoose.Types.ObjectId;
const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;
const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  _company: {
    type: SchemaObjectId,
    required: true,
    index: true
  },
  account: {
    email: {
      type: String,
      required: 'What was your email again?',
      validate: [isEmail, 'Are you sure your email is {VALUE}?'],
      unique: 'This email is already taken, please pick another!'
    },
    firstName: {
      type: String,
      required: 'I bet you have a first name...'
    },
    lastName: {
      type: String,
      required: 'Did you forget to enter your last name?'
    },
    hash: {
      type: Object,
      required: 'Some fancy server error: Error generating password hash.'
    },
    password: {
      type: String,
      required: 'I need to know your password! (Said the suspicious looking man...)'
    },
    profilePictureUrl: {
      type: String,
      default: defaultAvatarPath
    }
  },
  clearanceLevel: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: 'Please select a clearance level for this user.'
  }
}, {
  timestamps: true
});

// Allows for `unique` validations to return custom set message strings
UserSchema.plugin(beautifyUnqiue);

// Makes sure that everytime we call `toObject`, the password and hash fields are excluded.
UserSchema.set('toObject', {
  transform(doc, returnObj) {
    delete returnObj.account.password;
    delete returnObj.account.hash;
  }
});

UserSchema.statics.authenticate = function(conditions) {
  return new Promise((resolve, reject) => {
    this.findOne(conditions, (err, user) => {
      if (err) return reject('Oops! Invalid email or password... or both.');
      if (!user) return reject(`Sorry! No user found.`);
      // Finds the company associated with the user we just found
      Company.findById(user._company, (err, company) => {
        if (err) return reject(err);
        if (!company) return reject('We couldn\'t find a company associated to this user');
        // Returns the found user and company
        resolve({
          company: company.toObject(),
          user: user.toObject()
        });
      });
    });
  });
};

// Used in `server.js`, must use `bluebird` Promise to access `finally` method.
UserSchema.statics.findWithCompany = function(stringId) {
  return new Promise((resolve, reject) => {
    if (!stringId) return reject();

    this.findById(ObjectId(stringId), (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(`No user found by id: ${stringId}`);
      // Finds the company associated with the user we just found
      Company.findById(user._company, (err, company) => {
        if (err) return reject(err);
        if (!company) return reject(`No company found from id: ${user._company.toString()}`);
        // Returns the found user and company
        resolve({
          company: company.toObject(),
          user: user.toObject()
        });
      });
    });
  });
};

// Finds a user WITHOUT the password and hash
UserSchema.statics.findUser = function(conditions, notFoundMessage = 'No user found') {
  return new Promise((resolve, reject) => {
    this.find(conditions, (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(notFoundMessage);
      resolve(user.toObject());
    });
  });
};

// Finds multiple users WITHOUT the password and hash
UserSchema.statics.findUsers = function(conditions, notFoundMessage = 'No users found') {
  return new Promise((resolve, reject) => {
    this.findOne(conditions, (err, users) => {
      if (err) return reject(err);
      if (!users || !users.length) return reject(notFoundMessage);
      resolve(users.map((user) => user.toObject()));
    });
  });
};

UserSchema.statics.register = function(companyObjectId, data, clearanceLevel) {
  return new Promise((resolve, reject) => {
    const {firstName, lastName, email, password, passwordConfirmation} = data;
    
    if (password !== passwordConfirmation) return reject('Both your passwords have to match silly!');
    // Hashes the password
    const hash = bcrypt.hashSync(password);
    // Creates the user with the hashed password
    this.create({
      _company: companyObjectId,
      account: {firstName, lastName, email, hash, password},
      clearanceLevel: clearanceLevel || 'user'
    }, (err, user) => {
      if (err) return reject(err);
      // Sends back the user without the password fields
      resolve(user.toObject());
    });
  });
};

export default mongoose.model('User', UserSchema);
