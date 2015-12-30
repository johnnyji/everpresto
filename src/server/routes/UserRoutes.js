import express from 'express';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {extractErrorMessage} from './utils/ResponseHelper';

const User = mongoose.model('User');
const router = express.Router();

// Finds the current user
router.post('/current_user', (req, res, next) => {
  User.findUser({_id: ObjectId(req.session.userId)})
    .then((user) => res.status(200).json({user}))
    .catch((err) => res.status(422).json({message: extractErrorMessage(err)}));
});

export default router;