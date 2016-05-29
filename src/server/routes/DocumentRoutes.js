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
    const io = req.app.get('io').of('/documents');

    const docs$ = Observable.from(docs);
    const saveDocs$ = docs$
      .switchMap((doc) => Observable.fromPromise(Document.handleCreate(doc, companyId, userId)));
    const emailDocs$ = docs$.switchMap((doc) => sendInitialEmail$$(doc, user));
    const saveThenEmailDocs$ = saveDocs$.concat(emailDocs$);

    // First saves all the docs, and then begins to email them all.
    // The reason we want to save them all first is because, if an email fails,
    // we can still ensure that the document is saved
    saveThenEmailDocs$
      .subscribe(
        (doc) => {
          io.emit('sendEmailSuccess', {doc});
        },
        (err) => {
          io.emit('sendEmailError', err);
        },
        () => {
          // Fire complete socket.io event
          io.emit('sendEmailComplete');
          // Should I still respond to this AJAX call if we're sending messages through socket?
          res.status(201).json({collectionId});
        }
      );

  });

});

export default router;
