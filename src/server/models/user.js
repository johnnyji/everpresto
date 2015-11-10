import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import secrets from '../../.././secrets.json';
import config from '../../.././config';
import path from 'path';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  coursesOffered: {
    active: {type: Array, default: []},
    archived: {type: Array, default: []}
  },
  coursesTaking: {
    active: {type: Array, default: []},
    archived: {type: Array, default: []}
  },
  email: {type: String, required: true},
  name: {
    first: {type: String, required: true}
    last: {type:String, require: true}
  }
  password: {type: String, required: true},
  profilePictureUrl: {type: String, default: defaultAvatarPath},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
});

// Must use `function` syntax in order to scope `this` to be the User model
UserSchema.statics.findFromJwt = function (token) {
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
UserSchema.statics.findFromSession = function (sessionId) {
  return new Promise((resolve, reject) => {
    this.findOne(sessionId, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

export default mongoose.model('User', UserSchema);