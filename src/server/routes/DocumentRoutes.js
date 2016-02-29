import express from 'express';
import mongoose from 'mongoose';
import {extractErrorMessage} from './utils/ResponseHelper';

const Document = mongoose.model('Document');
const router = express.Router();

// Fetches all the documents for a given company
router.get('/index', (req, res) => {
  Document.find({_company: req.session.companyId}, (err, docs) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({docs});
  });
});

router.post('/create', (req, res) => {
  const {docs} = req.body;
  debugger;
});

export default router;