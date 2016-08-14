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
    passwordHash: {
      type: String,
      required: 'Something wen\'t wrong! Unable to save password'
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

// Makes sure that everytime we call `toObject`, the password hash is excluded.
UserSchema.set('toObject', {
  transform(doc, returnObj) {
    delete returnObj.account.passwordHash;
  }
});


/**
 * Authenticates the user and returns the the user and the company
 * if successful, or an error string if not
 *
 * @params {Object} options - The argument options
 * @param {String} options.email - The email the user provided
 * @param {String} options.password - The password the user provided
 * @returns {Promise} - The auth promise
 */
UserSchema.statics.authenticate = function({email, password}) {
  return new Promise((resolve, reject) => {
    this.findOne({'account.email': email})
      .exec((err, user) => {
        if (err) return reject('Oops, invalid email/password');
        if (!user) return reject(`Sorry! No user found.`);

        // Compares user provided password with hash
        bcrypt.compare(password, user.account.passwordHash, (err, matches) => {
          if (!matches) return reject('Oops, invalid password');

          Company
            .findById(user._company)
            .lean()
            .exec((err, company) => {
              if (err) return reject(err);
              if (!company) return reject('We couldn\'t find a company associated to this user');
              // We must call `toObject` on user to manually in order to remove
              // the password and the hash before returning
              resolve({company, user: user.toObject()});
            });
        });
      });
  });
};


/**
 * Finds the user and their associated company. Used in `server.js` for
 * server side rendering
 * @param {String} stringId - The string id of the user we're trying to find
 * @returns {Promise} - The promise returned
 */
UserSchema.statics.findWithCompany = function(stringId) {
  return new Promise((resolve, reject) => {
    if (!stringId) return reject();

    this.findById(ObjectId(stringId))
      .exec((err, user) => {
        if (err) return reject(err);
        if (!user) return reject(`No user found by id: ${stringId}`);

        // Finds the company associated with the user we just found
        Company.findById(user._company)
          .lean()
          .exec((err, company) => {
            if (err) return reject(err);
            if (!company) return reject(`No company found from id: ${user._company.toString()}`);

            // We must call `toObject` on user to manually in order to remove
            // the password and the hash before returning
            resolve({company, user: user.toObject()});
          });
      });
  });
};

UserSchema.statics.findUser = function(options, notFoundMessage = 'No user found') {
  return new Promise((resolve, reject) => {
    this.find(options, (err, user) => {
      if (err) return reject(err);
      if (!user) return reject(notFoundMessage);

      resolve(user.toObject());
    });
  });
};

UserSchema.statics.findUsers = function(options, notFoundMessage = 'No users found') {
  return new Promise((resolve, reject) => {
    this.findOne(options, (err, users) => {
      if (err) return reject(err);
      if (!users || !users.length) return reject(notFoundMessage);

      resolve(users.map((user) => user.toObject()));
    });
  });
};

UserSchema.statics.register = function(user, companyId, clearanceLevel) {
  return new Promise((resolve, reject) => {
    const {firstName, lastName, email, password, passwordConfirmation} = user;
  
    if (password !== passwordConfirmation) return reject('Both your passwords need to match');

    // Salt and Hashes the password
    //
    // Bcrypt has internal built-in salts it defaults to if we
    // don't specify a custom one
    bcrypt.hash(password, null, null, (err, passwordHash) => {
      if (err) return reject('Error saving password');

      this.create({
        _company: companyId,
        account: {firstName, lastName, email, passwordHash},
        clearanceLevel: clearanceLevel || 'user'
      }, (err, user) => {
        if (err) return reject(err);
        // Sends back the user without the password fields
        resolve(user.toObject());
      });
    });
  });
};

export default mongoose.model('User', UserSchema);
