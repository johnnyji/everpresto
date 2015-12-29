import express from 'express';
import mongoose from 'mongoose';
import {findFirstErrorMessage} from './utils/ResponseHelper';

const User = mongoose.model('User');
const router = express.Router();

// Finds the current user
router.post('/current_user', (req, res, next) => {
  User.findOne({_id: req.session.userId}, (err, user) => {
    if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
    res.status(200).json({user});
  });
});

export default router;