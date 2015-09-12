import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import secrets from '../../.././secrets.json';
import path from 'path';

const profilePicturePath = '../../.././public/images/avatar.jpg';

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePictureUrl: { type: String, default: profilePicturePath },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false },
  isEmployee: { type: Boolean, default: false },
  isEmployer: { type: Boolean, default: true }
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