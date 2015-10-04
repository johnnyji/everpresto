import express from 'express'
import jwt from 'jsonwebtoken';
import User from '.././models/User';

const router = express.Router();

router.post('/currentUser', (req, res, next) => {
  User.findOne({ _id: req.session.userId })
  .exec((err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ user: user });
  });
});

export default router;