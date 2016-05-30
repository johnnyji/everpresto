import express from 'express';
import mongoose from 'mongoose';
import Rx from 'rxjs/Rx';
import {extractErrorMessage, toObjects} from './utils/ResponseHelper';
import {sendInitialEmail} from '../services/mailers/DocumentMailer';

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
  const io = req.app.get('io');

  // Converts `User.findById` from a node callback to a stream
  const findUser$ = Observable.bindNodeCallback(User.findById.bind(User))(ObjectId(userId));

  // Finds the user that's creating these documents
  const saveAndEmailDocs$ = findUser$.switchMap((user) => {
    // Saves each of the documents and creates a stream
    // of the created documents
    const savedDocs$ = Observable
      .fromPromise(Document.handleCreateBatch(docs, companyId, userId))
      .switchMap((docs) => Observable.from(docs));

    // Onces the documents have all been saved to the database,
    // We can start to send them to their signers
    return savedDocs$
      .concatMap((doc) => {
        // Creates a stream from the `sendInitialEmail` node callback
        const sendInitialEmail$$ = Observable.bindNodeCallback(sendInitialEmail);
        // Sends each document to their respective signers
        return sendInitialEmail$$({
          doc: doc.toObject(),
          fromUser: user
        });

      });

  });

  saveAndEmailDocs$
    .subscribe((doc) => {
      console.info('Next: %s', doc);
      io.of('/documents').emit('sendEmailSuccess', doc);
    }, (err) => {
      console.info('Error: %s', err);
      io.of('/documents').emit('sendEmailError', err);
    }, () => {
      console.info('Completed');
      io.of('/documents').emit('sendEmailComplete');
      res.status(201).json({});
    });

});

export default router;
