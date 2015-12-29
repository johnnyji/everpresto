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

// Must use `function` syntax in order to scope `this` to be the User model.
// Used in `server.js`, must use `bluebird` Promise to access `finally` method.
UserSchema.statics.findWithCompany = function(objectId) {
  return new Promise((resolve, reject) => {
    if (!Boolean(id)) reject('Please provide an ObjectID for the user.');

    this
      .findOne({_id: id}, {account: {hash: 0, password: 0}})
      .populate('_company')
      .exec((err, user) => {
        if (err) reject(err);
        if (!user) reject('Server Error: This user doesn\'t exist.');
        if (!company) reject('Server Error: This user doesn\'t belong to a company.');
        // Returns the company and the user found
        resolve({company: user._company, user});
      });
  });
}

// Must export prior to declaring and using other models due to dependency and loading issues.
export default mongoose.model('User', UserSchema);

// Finds a user WITHOUT the password and hash
UserSchema.statics.findUser = function(conditions, notFoundMessage = 'No user found') {
  return new Promise((resolve, reject) => {
    this.findOne(conditions, {account: {hash: 0, password: 0}}, (err, user) => {
      if (err) reject(err);
      if (!user) reject(notFoundMessage);
      resolve(user);
    });
  });
}

// Finds multiple users WITHOUT the password and hash
UserSchema.statics.findUsers = function(conditions, notFoundMessage = 'No users found') {
  return new Promise((resolve, reject) => {
    this.find(conditions, {account: {hash: 0, password: 0}}, (err, users) => {
      if (err) reject(err);
      if (!Boolean(users)) reject('No users found');
      resolve(users);
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
      // TODO: Find new way to omit password and hash on select
      resolve(_.omit(user, ['password', 'hash']));
    });
  });
}