import express from 'express';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import secrets from '../../.././secrets.json';
import User from '.././models/user';

const router = express.Router();

// write function to protect routes where jwt is required

router.post('/login', (req, res, next) => {
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
      token: jwt.sign(user._id, secrets.jwtSecret)
    });
  });
});

router.post('/currentUser', (req, res, next) => {
  jwt.verify(req.body.jwt, secrets.jwtSecret, (err, decoded) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ user: decoded });
  });
});

export default router;