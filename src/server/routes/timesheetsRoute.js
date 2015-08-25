import express from 'express';
import mongoose from 'mongoose'
import config from '../../.././config';

const router = express.Router();
const db = mongoose.connection;

router.get('/', (req, res, next) => {
  res.json({ timesheets: 'Here they are!' });
});

export default router;