import set from 'lodash/set';
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
    default: ''
  },
  placeholders: [{
    value: {
      type: String,
      required: 'Please make sure all placeholders have values'
    },
    type: {
      type: String,
      enum: ['general', 'specific'],
      default: 'general'
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String
    }
  }],
  rawText: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

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