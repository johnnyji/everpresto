import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const User = mongoose.model('User');
const router = express.Router();

router.post('/currentUser', (req, res, next) => {
  User.findOne({ _id: req.session.userId })
  .exec((err, user) => {
    if (err) return res.status(500).json({message: err.message});
    res.status(200).json({user});
  });
});

export default router;