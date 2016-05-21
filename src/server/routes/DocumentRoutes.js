import express from 'express';
import mongoose from 'mongoose';
import Rx from 'rxjs/Rx';
import {extractErrorMessage, toObjects} from './utils/ResponseHelper';
import {sendInitialEmail$$} from '../services/mailers/DocumentMailer';

const ObjectId = mongoose.Types.ObjectId;
const Observable = Rx.Observable;
const Document = mongoose.model('Document');
const User = mongoose.model('User');
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

  
  User.findById(ObjectId(userId), (err, user) => {
    const io = req.app.get('io');

    // Creates each doc and emails them to their signers
    Observable.from(docs)
      .map((doc) => Document.handleCreate(doc, companyId, userId))
      .switchMap((doc) => sendInitialEmail$$(doc, user))
      .subscribe(
        (doc) => {
          // Fire document emailed socket.io event
          io.of('/documents').emit('emailed', {doc});
        },
        () => {},
        () => {
          // Should I still respond to this AJAX call if we're sending messages through socket?
          res.status(201).json({});
          // Fire complete socket.io event
        }
      );

    // // We return the entire collection containing the newly created documents, no need to convert `toObject`,
    // // already done
    // Document.handleCreateBatch(docs, companyId, userId)
    //   .then((collection) => {
    //     // TODO: Is it possible to do this using socket.io?
    //     DocumentMailer.sendInitialEmails(
    //       collection.documents,
    //       user,
    //       Document.handleUnsentDocs,
    //       Document.handleSentDocs
    //     );
    //     res.status(201).json({collection});
    //   })
    //   .catch((err) => {
    //     res.status(422).json({message: extractErrorMessage(err)});
    //   });
  });
});

export default router;
