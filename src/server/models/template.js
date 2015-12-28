import _ from 'lodash';
import mongoose from 'mongoose';
import xss from 'xss';

const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const TemplateSchema = new Schema({
  _owner: {
    type: ObjectId,
    ref: 'User',
    index: true
  },
  body: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  },
  placeholders: {
    type: Array,
    default: []
  },
  title: {
    type: String,
    required: 'Please give your template a title!'
  },
  rawText: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  }
}, {
  timestamps: true
});

TemplateSchema.statics.createTemplate = function(data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = _.set(data, 'body', xss(data.body));

    this.create(sanitizedData, (err, template) => {
      if (err) reject(err);
      resolve(template);
    });
  });
}

TemplateSchema.statics.updateTemplate = function(id, data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = _.set(data, 'body', xss(data.body));

    this.findOneAndUpdate({_id: id}, {$set: sanitizedData}, {'new': true}, (err, template) => {
      if (err) reject(err);
      resolve(template);
    });
  });
}

export default mongoose.model('Template', TemplateSchema);