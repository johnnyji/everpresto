import express from 'express';
import mongoose from 'mongoose';
import {extractErrorMessage, toObjects} from './utils/ResponseHelper';

const ObjectId = mongoose.Types.ObjectId;
const Template = mongoose.model('Template');
const router = express.Router();

// Retrieves all of the current company's existing templates
router.get('/index', (req, res) => {
  Template
    .find({_company: ObjectId(req.session.companyId)})
    .sort({updatedAt: -1})
    .exec((err, templates) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({templates: toObjects(templates)});
    });
});

// Gets a specific template by the `_id` string in the request params
router.get('/:id', (req, res) => {
  Template.findById(ObjectId(req.params.id), (err, template) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({template: template.toObject()});
  })
});

// Creates a new template
router.post('/create', (req, res) => {
  const {body, rawText, placeholders, title} = req.body.template;
  Template.createTemplate({
    _company: req.session.companyId,
    _creator: req.session.userId,
    body,
    rawText,
    placeholders,
    title
  })
    .then((template) => {
      // No need to send back the template because we will query for all of them.
      res.status(204).end();
    })
    .catch((err) => res.status(422).json({message: extractErrorMessage(err)}));
});

// Deletes a template
router.post('/delete', (req, res) => {
  Template.remove({_id: ObjectId(req.body.templateId)}, (err) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(204).end();
  });
});

// Updates a template
router.post('/update', (req, res) => {
  const {templateData, templateId} = req.body;

  Template.updateTemplate(templateId, templateData)
    .then(() => res.status(204).end())
    .catch((err) => res.status(422).json({message: extractErrorMessage(err)}));
});

export default router;