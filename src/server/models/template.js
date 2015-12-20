import _ from 'lodash';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import sanitizer from 'sanitizer';

const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const TemplateSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: 'Please give your template a title!'
  },
  htmlText: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  },
  rawText: {
    type: String,
    required: 'Your template can\'t be empty silly!'
  },
  placeholders: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

TemplateSchema.statics.create = function(data) {
  return new Promise((resolve, reject) => {
    // TODO: Make sure sanitization works.
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = _.set(data, 'htmlText', sanitizer.sanitize(data.htmlText));
    debugger;
    this.create(sanitizedData, (err, template) => {
      if (err) reject(err);
      resolve(template);
    });
  });
}

export default mongoose.model('Template', TemplateSchema);