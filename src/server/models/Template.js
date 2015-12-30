import _ from 'lodash';
import mongoose from 'mongoose';
import xss from 'xss';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TemplateSchema = new Schema({
  _company: {
    type: ObjectId,
    ref: 'Company',
    required: true,
    index: true
  },
  _creator: {
    type: ObjectId,
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
    const sanitizedData = _.set(data, 'body', xss(data.body));
    const {_company, _creator, body, placeholders, rawText, title} = sanitizedData;
    debugger;
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

TemplateSchema.statics.updateTemplate = function(id, data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = _.set(data, 'body', xss(data.body));

    this.findOneAndUpdate(
      {_id: id},
      {$set: sanitizedData},
      {new: true, runValidators: true}
    ).exec((err, template) => {
      if (err) return reject(err);
      resolve(template);
    });
  });
}

// Must export prior to declaring and using other models due to dependency and loading issues.
export default mongoose.model('Template', TemplateSchema);