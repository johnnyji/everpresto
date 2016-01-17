import {set} from 'lodash/set';
import mongoose from 'mongoose';
import xss from 'xss';

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const TemplateSchema = new Schema({
  _company: {
    type: SchemaObjectId,
    required: true,
    index: true
  },
  _creator: {
    // This references to the `User` that created the template
    type: SchemaObjectId,
    index: true
  },
  body: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  },
  placeholders: [{
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
    const sanitizedData = set(data, 'body', xss(data.body));

    // Whitelist attributes
    this.create({
      _company: sanitizedData._company,
      _creator: sanitizedData._creator,
      body: sanitizedData.body,
      placeholders: sanitizedData.placeholders,
      rawText: sanitizedData.rawText,
      title: sanitizedData.title
    }, (err, template) => {
      if (err) return reject(err);
      resolve(template.toObject());
    });
  });
}

TemplateSchema.statics.updateTemplate = function(stringId, data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = set(data, 'body', xss(data.body));

    this.findByIdAndUpdate(
      ObjectId(stringId),
      {$set: sanitizedData},
      {new: true, runValidators: true}
    ).exec((err, template) => {
      if (err) return reject(err);
      if (!template) return reject('Sorry but this template doesn\'t exist...');
      resolve(template.toObject());
    });
  });
}

// Must export prior to declaring and using other models due to dependency and loading issues.
export default mongoose.model('Template', TemplateSchema);