import express from 'express';
import mongoose from 'mongoose'
import config from '../../.././config';

import Timesheet from '.././models/timesheet';

const router = express.Router();
const db = mongoose.connection;

router.get('/', (req, res) => {
  Timesheet.find((err, timesheets) => {
    if (err) { return res.status(500).json(err); }
    res.status(200).send({ timesheets: timesheets });
  });
});

router.post('/', (req, res) => {
  let timesheet = new Timesheet(req.params.timesheet);
  timesheet.save((err) => {
    if (err) { return res.status(500).json(err); }
    res.state(201).json(null);
  });
});


export default router;