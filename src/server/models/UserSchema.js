import _ from 'lodash';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import secrets from '../../.././secrets.json';
import config from '../../.././config';
import path from 'path';

import UserValidator from '.././validators/UserValidator';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

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
      required: 'Some fancy server error: Error generating password hash.',
      select: false
    },
    password: {
      type: String,
      required: 'I need to know your password! (Said the suspicious looking man...)',
      select: false
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

// Must use `function` syntax in order to scope `this` to be the User model.
// Used in `server.js`, must use `bluebird` Promise to access `finally` method.
UserSchema.statics.findFromSession = function(sessionId) {
  return new Promise((resolve, reject) => {
    if (!Boolean(sessionId)) reject();

    this.findOne(sessionId, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}


UserSchema.statics.register = function(companyObjectId, data, clearanceLevel) {
  return new Promise((resolve, reject) => {
    const {firstName, lastName, email, hash, password, passwordConfirmation} = data;
    
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
      resolve(_.omit(user, ['password', 'hash']));
    });
  });
}

export default UserSchema;