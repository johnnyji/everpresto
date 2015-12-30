import _ from 'lodash';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import config from '../../.././config';
import path from 'path';

import UserValidator from '.././validators/UserValidator';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  _company: {
    type: ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  account: {
    email: {
      type: String,
      required: 'What was your email again?',
      validate: [UserValidator.email, 'Are you sure your email is {VALUE}?']
    },
    firstName: {
      type: String,
      required: 'I bet you have a first name...'
    },
    lastName: {
      type:String,
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

// Makes sure that everytime we call `toObject`, the password and hash fields are excluded.
UserSchema.set('toObject', {
  transform: function(doc, returnObj, options) {
    delete returnObj.account.password;
    delete returnObj.account.hash;
    return returnObj;
  }
});


// Used in `server.js`, must use `bluebird` Promise to access `finally` method.
UserSchema.statics.findWithCompany = function(stringId) {
  return new Promise((resolve, reject) => {
    if (!Boolean(stringId)) reject('Please provide an ObjectID string for the user.');

    this
      .findOne(ObjectId(stringId))
      .populate('_company')
      .exec((err, user) => {
        if (err) reject(err);
        if (!user) reject('Server Error: This user doesn\'t exist.');
        user = user.toObject();
        // Returns the company and the user found
        resolve({company: user._company, user});
      });
  });
}

// Finds a user WITHOUT the password and hash
UserSchema.statics.findUser = function(conditions, notFoundMessage = 'No user found') {
  return new Promise((resolve, reject) => {
    this.findOne(conditions, (err, user) => {
      if (err) reject(err);
      if (!user) reject(notFoundMessage);
      resolve(user.toObject());
    });
  });
}

// Finds multiple users WITHOUT the password and hash
UserSchema.statics.findUsers = function(conditions, notFoundMessage = 'No users found') {
  return new Promise((resolve, reject) => {
    this.find(conditions, (err, users) => {
      if (err) reject(err);
      if (!Boolean(users)) reject('No users found');
      resolve(users.map((user) => user.toObject()));
    });
  });
}

UserSchema.statics.register = function(companyObjectId, data, clearanceLevel) {
  return new Promise((resolve, reject) => {
    const {firstName, lastName, email, password, passwordConfirmation} = data;
    
    if (password !== passwordConfirmation) return reject(new Error('Both your passwords have to match silly!'));
    // Hashes the password
    const hash = bcrypt.hashSync(password);
    // Creates the user with the hashed password
    this.create({
      _company: companyObjectId,
      account: {firstName, lastName, email, hash, password},
      clearanceLevel: Boolean(clearanceLevel) ? clearanceLevel : 'user'
    }, (err, user) => {
      if (err) reject(err);
      // Sends back the user without the password fields
      resolve(user.toObject());
    });
  });
}

export default mongoose.model('User', UserSchema);