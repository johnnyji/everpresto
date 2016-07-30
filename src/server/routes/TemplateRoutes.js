import express from 'express';
import mongoose from 'mongoose';
import {extractErrorMessage} from './utils/ResponseHelper';
import Config from '../.././client/config/main';

const ObjectId = mongoose.Types.ObjectId;
const Template = mongoose.model('Template');
const router = express.Router();

// Retrieves all of the current company's existing templates
router.get('/', (req, res) => {
  Template
    .find({_company: ObjectId(req.session.companyId)})
    .sort({updatedAt: -1})
    .lean()
    .exec((err, templates) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({templates});
    });
});

// Gets a specific template by the `_id` string in the request params
router.get('/:id', (req, res) => {
  Template.findById(ObjectId(req.params.id))
    .lean()
    .exec((err, template) => {
      if (err) return res.status(422).json({message: extractErrorMessage(err)});
      res.status(200).json({template});
    });
});

// Creates a new template
router.post('/create', (req, res) => {
  Template.create({
    _company: ObjectId(req.session.companyId),
    _creator: ObjectId(req.session.userId),
    body: Config.template.hintBody
  }, (err, template) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(201).json({template: template.toObject()});
  });
});

// Deletes a template
router.delete('/:id', (req, res) => {
  Template.remove({_id: ObjectId(req.params.id)}, (err) => {
    if (err) return res.status(422).json({message: extractErrorMessage(err)});
    res.status(200).json({id: req.params.id});
  });
});

// Updates a template
router.post('/update', (req, res) => {
  const {templateData, templateId} = req.body;

  Template.updateTemplate(templateId, templateData)
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(422).json({message: extractErrorMessage(err)});
    });
});

export default router;
