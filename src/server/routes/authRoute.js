import express from 'express';
import jwt from 'jsonwebtoken';
import User from '.././models/user';

const router = express.Router();

router.post('/register', (req, res, next) => {
  User.register(req.body.user)
    .then(user => res.status(201).json({ user: user }))
    .catch(err => res.status(422).json({ message: err }));
});

router.post('/login', (req, res, next) => { // TODO: Hash and salt password
  User.findAndAuthenticate(req.body.user)
    .then(user => {
      // create a jsonwebtoken on user authenticate
      let token = jwt.sign(user, app.get('tokenSecret'), {
        expiresInMinutes: 1440 // 24 hrs
      });
      res.status(201).json({
        user: user,
        token: token
      });
    })
    .catch(err => res.status(401).json({ message: err }));
});

export default router;