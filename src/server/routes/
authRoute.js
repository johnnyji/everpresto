import express from 'express';
import mongoose from 'mongoose';
import {findFirstErrorMessage} from './utils/ResponseHelper';

const User = mongoose.model('User');
const router = express.Router();

// Authenticates the user and stores the appropriate userId into the session
router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.user.email,
    password: req.body.user.password
  })
  .exec((err, user) => {
    if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
    if (!user) return res.status(422).json({ message: 'Invalid Username/Password' });
    req.session.userId = user._id;
    res.status(201).json({user});
  });
});

// Deletes the userId session and logs out the user
router.get('/logout', (req, res, next) => {
  delete req.session.userId;
  res.status(204).end();
});

// Creates a new user
router.post('/register', (req, res, next) => {
  const {firstName, lastName, email, password, passwordConfirmation} = req.body.user;

  User.register({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation
  })
    .then((user) => {
      // Sets the current user session
      req.session.userId = user._id;
      res.status(201).json({user});
    })
    .catch((err) => res.status(422).json({message: findFirstErrorMessage(err)}));
});

export default router;