import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false }
});

let User = mongoose.model('User', UserSchema);

export default User;