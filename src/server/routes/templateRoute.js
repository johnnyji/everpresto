import express from 'express';
import mongoose from 'mongoose';
import requireUser from '.././middlewares/requireUser';
import {findFirstErrorMessage} from './utils/responseHelper';

const Template = mongoose.model('Template');
const router = express.Router();

// Makes sure each route requires a user before execution
router.use(requireUser);

// Creates a new template
router.post('/create', (req, res) => {
  const {body, rawText, placeholders, title} = req.body.template;
  Template.createTemplate({
    owner: req.session.userId,
    body,
    rawText,
    placeholders,
    title
  })
    .then((template) => {
      res.status(201).json({template})
    })
    .catch((result) => {
      res.status(422).json({message: findFirstErrorMessage(result)});
    });
});

// Retrieves all of the current user's existing templates
router.get('/index', (req, res) => {
  Template.find({_owner: req.session.userId}, (err, templates) => {
    if (err) res.status(422).json({message: findFirstErrorMessage(result)});
    // TODO: Finish retrieving templates functionality
  });
});

export default router;