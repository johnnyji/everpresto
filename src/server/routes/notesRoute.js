import express from 'express';
import mongoose from 'mongoose';

const Note = mongoose.model('Note');
const router = express.Router();

router.post('/', (req, res, next) => {
  Note.create(req.body.note, (err, note) => {
    err
      ? res.status(422).json({ message: err })
      : res.status(201).json({ note: note });
  });
});

export default router;