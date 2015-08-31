import express from 'express';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import User from '.././models/user';
import TokenHelpers from '.././helpers/tokenHelpers';

const router = express.Router();

router.post('/register', (req, res, next) => {
  let userParams = {
    email: req.body.user.email,
    password: req.body.user.password
  };
  User.create(userParams, (err, user) => {
    if (err) return res.status(422).json({ message: err });
    res.status(201).json({ 
      user: user,
      token: TokenHelpers.createToken(user, req.app.get('tokenSecret'))
    });
  });
});

export default router;