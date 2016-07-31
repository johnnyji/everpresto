import {
  DOCUMENT_SEND_EMAIL_ERROR,
  DOCUMENT_SEND_EMAIL_SUCCESS,
  DOCUMENT_SEND_EMAILS_COMPLETE
} from '../sockets/action_types/documentSocketActionTypes';
import {extractErrorMessage} from './utils/ResponseHelper';
import express from 'express';
import mongoose from 'mongoose';
import {Observable} from 'rxjs/Rx';
import {sendInitialEmail} from '../services/mailers/DocumentMailer';
import socketConfig from '../sockets/utils/config';

const ObjectId = mongoose.Types.ObjectId;
const Document = mongoose.model('Document');
const User = mongoose.model('User');
const router = express.Router();

// Fetches all the documents for a given company
router.get('/', (req, res) => {
  Document
    .find({_company: req.session.companyId})
    .sort({createdAt: -1})
    .lean()
    .exec((err, docs) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({docs});
    });
});

router.post('/create', (req, res) => {
  const {docs} = req.body;
  const {companyId, userId} = req.session;
  const documentsSocket = req.app.get('io').of(socketConfig.paths.server.documents);

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
        return sendInitialEmail$$({doc, fromUser: user});
      });

  });

  // Emit socket message every time an email sends,
  // Also notifies errors and finishing
  saveAndEmailDocs$
    .subscribe((doc) => {
      documentsSocket.emit(DOCUMENT_SEND_EMAIL_SUCCESS, doc);
    }, (err) => {
      documentsSocket.emit(DOCUMENT_SEND_EMAIL_ERROR, err);
    }, () => {
      documentsSocket.emit(DOCUMENT_SEND_EMAILS_COMPLETE);
      res.status(201).json({});
    });

});

export default router;