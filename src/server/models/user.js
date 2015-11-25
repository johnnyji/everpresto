import Promise from 'bluebird';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import passwordHashAndSalt from 'password-hash-and-salt';
import secrets from '../../.././secrets.json';
import config from '../../.././config';
import path from 'path';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  coursesOffered: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  coursesTaking: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  email: {
    type: String,
    required: 'What was your email again?',
    validate: [UserValidator.validateEmail, 'Are you sure is {VALUE}?']
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
    required: 'I need to know your password! (Said the suspicious looking man...)',
  },
  profilePictureUrl: {type: String, default: defaultAvatarPath}
}, {
  timestamps: true
});

// Validates if the password verifies against the hash correctly
UserSchema.path('password').validate(function(value, done) {
  passwordHashAndSalt(value).verifyAgainst(this.hash, (err, verified) => {
    // calls the callback on the valdiation against if the password verified or not
    done(err || !verified);
  });
}, 'Some fancy server error: Password failed hash verification.');


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
    const hashedPassword = passwordHashAndSalt(data.password).hash((err, hash) => {
      if (err) return new Error('Sorry! Our servers are being all weird... Maybe try again?');
      return hash;
    });
    if (hashedPassword instanceof Error) return reject(hashedPassword);

    // Creates the user with the hashed password
    User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hash: hashedPassword,
      password: data.password
    }, (err, user) => {

    });

  });
}

export default mongoose.model('User', UserSchema);