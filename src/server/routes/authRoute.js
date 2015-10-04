import express from 'express';
import jwt from 'jsonwebtoken';
import secrets from '../../.././secrets.json';
import User from '.././models/User';

const router = express.Router();

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.user.email,
    password: req.body.user.password
  })
  .exec((err, user) => {
    if (err) throw new Error(err);
    if (!user) return res.status(422).json({ message: 'Invalid Username/Password' });

    // sets the user session on the backend and sends the jwt to the front end
    req.session.userId = user._id;
    res.status(200).json({ 
      user: user,
      jwt: jwt.sign(user._id, secrets.jwtSecret)
    });
  });
});

router.get('/logout', (req, res, next) => {
  delete req.session.userId;
  res.status(204).json(null);
});

router.post('/authenticate_with_token', (req, res, next) => {
  jwt.verify(req.body.jwt, secrets.jwtSecret, (err, decoded) => {
    if (err) return res.status(500).json({ message: err.message });

    User.findOne({ 
      email: decoded.email,
      password: decoded.password
    }).exec((err, user) => {
      res.status(201).json({ user: user });
    });
  });
});

router.post('/register', (req, res, next) => {
  let userParams = {
    email: req.body.user.email,
    password: req.body.user.password
  };
  User.create(userParams, (err, user) => {
    if (err) return res.status(422).json({ message: err });
    res.status(201).json({ 
      user: user,
      jwt: jwt.sign(user._id, secrets.jwtSecret)
    });
  });
});

export default router;