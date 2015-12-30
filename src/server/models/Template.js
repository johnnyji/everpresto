import _ from 'lodash';
import {ObjectId} from 'mongodb';
import mongoose from 'mongoose';
import xss from 'xss';

const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const TemplateSchema = new Schema({
  _company: {
    type: SchemaObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  _creator: {
    type: SchemaObjectId,
    ref: 'User',
    index: true
  },
  body: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  },
  placeholders: [{
    label: {
      type: String,
      required: 'Please make sure all placeholders have labels'
    },
    value: {
      type: String,
      required: 'Please make sure all placeholders have values'
    }
  }],
  rawText: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  },
  title: {
    type: String,
    required: 'Please give your template a title!'
  }
}, {
  timestamps: true
});

TemplateSchema.statics.createTemplate = function(data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    // TODO: Find way to keep classes and ids (only remove script tags)
    const sanitizedData = _.set(data, 'body', xss(data.body));
    const {_company, _creator, body, placeholders, rawText, title} = sanitizedData;

    this.create({
      _company,
      _creator,
      body,
      placeholders,
      rawText,
      title  
    }, (err, template) => {
      if (err) return reject(err);
      resolve(template.toObject());
    });
  });
}

TemplateSchema.statics.updateTemplate = function(stringId, data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = _.set(data, 'body', xss(data.body));
    debugger;
    this.findOneAndUpdate(
      {_id: ObjectId(stringId)},
      {$set: sanitizedData},
      {new: true, runValidators: true}
    ).exec((err, template) => {
      if (err) return reject(err);
      if (!template) return reject('Sorry but this template doesn\'t exist...');
      resolve(template);
    });
  });
}

// Must export prior to declaring and using other models due to dependency and loading issues.
export default mongoose.model('Template', TemplateSchema);