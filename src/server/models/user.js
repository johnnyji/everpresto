import _ from 'lodash';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import secrets from '../../.././secrets.json';
import config from '../../.././config';
import path from 'path';

import UserValidator from '.././validators/UserValidator';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
}, {
  timestamps: true
});

// Validates if the password verifies against the hash correctly
UserSchema.path('password').validate(function(value, done) {
  bcrypt.compare(value, this.hash, (err, res) => {
    if (err) return done(false);
    done(res);
  });
}, 'Uh oh, server error: Password failed hash verification.');


// Must use `function` syntax in order to scope `this` to be the User model
UserSchema.statics.findFromJwt = function(token) {
  // returns a pending promise 
  return new Promise((resolve, reject) => {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if (err) reject(err);

      this.findOne(decoded, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  });
}

// Must use `function` syntax in order to scope `this` to be the User model
UserSchema.statics.findFromSession = function(sessionId) {
  return new Promise((resolve, reject) => {
    if (!Boolean(sessionId)) reject();

    this.findOne(sessionId, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

UserSchema.statics.register = function(data) {
  return new Promise((resolve, reject) => {
    if (data.password !== data.passwordConfirmation) return reject(new Error('Both your passwords have to match silly!'));

    // Hashes the password
    const hash = bcrypt.hashSync(data.password);

    // Creates the user with the hashed password
    this.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hash,
      password: data.password
    }, (err, user) => {
      if (err) reject(err);
      // Sends back the user without the password fields
      resolve(_.omit(user, ['password', 'hash']));
    });

  });
}

export default mongoose.model('User', UserSchema);