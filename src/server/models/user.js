import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import secrets from '../../.././secrets.json';
import config from '../../.././config';
import path from 'path';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePictureUrl: { type: String, default: defaultAvatarPath },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false },
  groupPreviews: { type: Array, default: [] },
  activeGroupId: String
});

// Must use `function` syntax in order to scope `this` to be the User model
UserSchema.statics.findByJwt = function (token) {
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

export default mongoose.model('User', UserSchema);