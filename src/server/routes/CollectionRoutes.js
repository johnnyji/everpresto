import express from 'express';
import mongoose from 'mongoose';
import {extractErrorMessage} from './utils/ResponseHelper';

const ObjectId = mongoose.Types.ObjectId;
const Collection = mongoose.model('Collection');
const router = express.Router();

// Retrieves all of the current user's existing collections
router.get('/', (req, res) => {
  Collection
    .find({_company: ObjectId(req.session.companyId)})
    .sort({createdAt: -1})
    .lean()
    .exec((err, collections) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({collections});
    });
});

// Shows a collection with all it's documents
router.get('/:id', (req, res) => {
  Collection.findWithDocuments(req.params.id)
    .then((collection) => {
      res.status(200).json({collection});
    })
    .catch((err) => {
      res.status(422).json({message: extractErrorMessage(err)});
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
    res.status(201).json({collection: collection.toObject()});
  });
});

// Deletes a collection
router.delete('/:id', (req, res) => {
  Collection.remove({_id: ObjectId(req.params.id)}, (err) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({});
  });
});

// Updates a collection
router.post('/update', (req, res) => {
  const {collectionData, collectionId} = req.body;

  Collection
    .findByIdAndUpdate(
      ObjectId(collectionId),
      {$set: {title: collectionData.title}},
      {new: true, runValidators: true}
    )
    .lean()
    .exec((err, collection) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({collection});
    });
});

export default router;
