import express from 'express';
import mongoose from 'mongoose'
import config from '../../.././config';

import Timesheet from '.././models/timesheet';

const router = express.Router();
const db = mongoose.connection;

// get all timesheets
router.get('/', (req, res) => {
  Timesheet.find((err, timesheets) => {
    if (err) { return res.status(500).json(err); }
    res.status(200).send({ timesheets: timesheets });
  });
});

// create timesheet, body: timesheet
router.post('/', (req, res) => {
  let timesheet = new Timesheet(req.body.timesheet);
  timesheet.save((err) => {
    if (err) { return res.status(500).json({ message: 'Unable to save' }); }
    res.status(201).json({ timesheet: timesheet });
  });
});

// delete timesheet, body: _id
router.delete('/', (req, res) => {
  Timesheet.remove({ _id: req.body._id }, (err) => {
    if (err) { return res.status(500).json(err); }
    res.status(200).json({ _id: req.body._id });
  });
});


export default router;