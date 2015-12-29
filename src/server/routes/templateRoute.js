import express from 'express';
import mongoose from 'mongoose';
import requireUser from '.././middlewares/requireUser';
import {findFirstErrorMessage} from './utils/ResponseHelper';

const Template = mongoose.model('Template');
const router = express.Router();

// Makes sure each route requires a user before execution
router.use(requireUser);

// Retrieves all of the current user's existing templates
router.get('/index', (req, res) => {
  Template
    .find({_owner: req.session.userId})
    .sort({updatedAt: -1})
    .exec((err, templates) => {
      if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
      res.status(200).json({templates});
    });
});

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
    .catch((err) => res.status(422).json({message: findFirstErrorMessage(err)}));
});

// Deletes a template
router.post('/delete', (req, res) => {
  Template.remove({_id: req.body.templateId}, (err) => {
    if (err) return res.status(422).json({message: findFirstErrorMessage(err)});
    res.status(204).end();
  });
});

// Updates a template
router.post('/update', (req, res) => {
  const {templateData, templateId} = req.body;

  Template.updateTemplate(templateId, templateData)
    .then(() => res.status(204).end())
    .catch((err) => res.status(422).json({message: findFirstErrorMessage(err)}));
});

export default router;