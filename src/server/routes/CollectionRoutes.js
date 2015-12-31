import express from 'express';
import mongoose from 'mongoose';
import requireUser from '.././middlewares/requireUser';
import {extractErrorMessage} from './utils/ResponseHelper';

const ObjectId = mongoose.Types.ObjectId;
const Collection = mongoose.model('Collection');
const router = express.Router();

// Makes sure each route requires a user before execution
router.use(requireUser);

// Retrieves all of the current user's existing collections
router.get('/index', (req, res) => {
  Collection
    .find({_company: ObjectId(req.session.companyId)})
    .sort({createdAt: -1})
    .exec((err, collections) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({collections});
    });
});

// Creates a new collection
router.post('/create', (req, res) => {
  Collection.create({
    _company: ObjectId(req.session.companyId),
    _creator: ObjectId(req.session.userId),
    title: 'Untitled'
  }, (err, collection) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(201).json({collection});
  });
});

// Deletes a collection
router.post('/delete', (req, res) => {
  Collection.remove({_id: ObjectId(req.body.collectionId)}, (err) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(204).end();
  });
});

// Updates a collection
router.post('/update', (req, res) => {
  const {collectionData, collectionId} = req.body;

  Collection.findByIdAndUpdate(ObjectId(collectionId), {$set: collectionData}, (err, collection) => {
    debugger;
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({collection});
  });
});

export default router;