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
    _owner: req.session.userId,
    body,
    rawText,
    placeholders,
    title
  })
    .then((template) => {
      // No need to send back the template because we will query for all of them.
      res.status(201).end();
    })
    .catch((result) => {
      res.status(422).json({message: findFirstErrorMessage(result)});
    });
});

// Retrieves all of the current user's existing templates
router.get('/index', (req, res) => {
  Template
    .find({_owner: req.session.userId})
    .sort({updatedAt: -1})
    .exec((err, templates) => {
      if (err) res.status(422).json({message: findFirstErrorMessage(result)});
      res.status(200).json({templates});
    });
});


router.post('/delete', (req, res) => {
  Template.remove(req.body.templateId, (err, template) => {
    debugger;
    if (err) res.status(422).json({message: findFirstErrorMessage(result)});
    res.status(204).end();
  });
});

export default router;