import express from 'express';
import mongoose from 'mongoose';
import {findFirstErrorMessage} from './utils/ResponseHelper';

const Company = mongoose.model('Company');
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
router.get('/logout', (req, res) => {
  delete req.session.userId;
  res.status(204).end();
});

// Creates a new user
router.post('/register', (req, res) => {
  User.register(req.body.user)
    .then((user) => {
      // Sets the current user session
      req.session.userId = user._id;
      res.status(201).json({user});
    })
    .catch((err) => res.status(422).json({message: findFirstErrorMessage(err)}));
});

// Creates a user along with the company. The created user will be the admin and the very first
// user of the company.
router.post('/register_with_company', (req, res) => {
  const {company, user} = req.body;

  Company.createWithUser(company, user)
    .then((response) => {
      const {company, user} = response;
      // Saves the user's id into session after successful creation
      req.session.userId = user._id;
      res.status(201).json({company, user});
    })
    .catch((err) => res.status(422).json({message: findFirstErrorMessage(err)}));
});

export default router;