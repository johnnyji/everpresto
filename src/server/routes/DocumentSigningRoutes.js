import express from 'express';
import mongoose from 'mongoose';
import {extractErrorMessage} from './utils/ResponseHelper';

const ObjectId = mongoose.Types.ObjectId;
const Document = mongoose.model('Document');
const router = express.Router();

// Fetches the document that needs to be signed
router.get('/:id/token/:signature_token', (req, res) => {
  const {params} = req;

  Document.findOne({
    _id: ObjectId(params.id),
    signatureLinkToken: params.signature_token
  }, (err, doc) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({doc: doc.toObject()});
  });
});

export default router;
