import express from 'express';
import mongoose from 'mongoose'
import config from '../../.././config';

const router = express.Router();
const db = mongoose.connection;

router.get('/', (req, res, next) => {
  // some more code here...
  res.json({ hello: 'world' });
});

export default router;