import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import secrets from '../../.././secrets.json';
import config from '../../.././config';
import path from 'path';

const defaultAvatarPath = `${config.s3BucketPath}/public/avatar.jpg`;

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePictureUrl: { type: String, default: defaultAvatarPath },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false },
  groupPreviews: { type: Array, default: [] },
  activeGroupId: String
});

let User = mongoose.model('User', UserSchema);

UserSchema.statics.findByJwt = jwt => {
  debugger;
  return new Promise((resolve, reject) => {
    jwt.verify(jwt, secrets.jwtSecret, (err, decoded) => {
      if (err) reject(err);

      this.findOne(decoded, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    }.bind(this));
  }.bind(this));
}

export default User;