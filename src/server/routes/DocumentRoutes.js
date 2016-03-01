import express from 'express';
import mongoose from 'mongoose';
import {extractErrorMessage, toObjects} from './utils/ResponseHelper';

const Document = mongoose.model('Document');
const router = express.Router();

// Fetches all the documents for a given company
router.get('/index', (req, res) => {
  Document.find({_company: req.session.companyId}, (err, docs) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({docs: toObjects(docs)});
  });
});

router.post('/create', (req, res) => {
  const {docs} = req.body;
  const {companyId, userId} = req.session;

  Document.batchCreate(docs, companyId, userId)
    // We return the entire collection containing the newly created documents, no need to convert `toObject`,
    // already done
    .then((collection) => res.status(201).json({collection}))
    .catch((err) => res.status(422).json({message: extractErrorMessage(err)}));
});

export default router;