import express from 'express';
import mongoose from 'mongoose';
import requireUser from '.././middlewares/requireUser';
import {findFirstErrorMessage} from './utils/ResponseHelper';

const Collection = mongoose.model('Collection');
const router = express.Router();

// Makes sure each route requires a user before execution
router.use(requireUser);

// Retrieves all of the current user's existing collections
router.get('/index', (req, res) => {
  Collection
    .find({_owner: req.session.userId})
    .sort({createdAt: -1})
    .exec((err, collections) => {
      if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
      res.status(200).json({collections});
    });
});

// Creates a new collection
router.post('/create', (req, res) => {
  Collection.create({_owner: req.session.userId}, (err, collection) => {
    if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
    res.status(201).json({collection});
  });
});

// Deletes a collection
router.post('/delete', (req, res) => {
  Collection.remove({_id: req.body.collectionId}, (err) => {
    if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
    res.status(204).end();
  });
});

// Updates a collection
router.post('/update', (req, res) => {
  const {collectionData, collectionId} = req.body;

  Collection.findById(collectionId, (err, collection) => {
    debugger;
  });

  Collection.findOneAndUpdate(
    {_id: collectionId},
    {$set: collectionData},
    {new: true, runValidators: true}
  ).exec((err, collection) => {
    debugger;
  });
});

export default router;