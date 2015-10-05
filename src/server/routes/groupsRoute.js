import express from 'express';
import mongoose from 'mongoose';

const Group = mongoose.model('Group');
const User = mongoose.model('User');
const router = express.Router();

router.get('/active', (req, res, next) => {
  User.findOne({ _id: req.session.userId }, 'activeGroupId', (err, user) => {
    if (err) return res.status(500).json({ message: err });
    res.status(200).json(null);
  });
});

export default router;