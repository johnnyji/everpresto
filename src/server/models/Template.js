import set from 'lodash/set';
import mongoose from 'mongoose';
import xss from 'xss';

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

// Default placeholders that every template needs to have. Without specific placeholders for each contact like
// FIRST_NAME or EMAIL, we have no way of actually contacting the person receiving the document.
const REQUIRED_PLACEHOLDERS = [
  {
    isRequired: true,
    tip: "First names are unique to each signer and required. You don't have to use this in your template if you don't need to, but you probably should!",
    type: 'specific',
    value: 'FIRST_NAME'},
  {
    isRequired: true,
    tip: "Last names are unique to each signer and required. You don't have to use this in your template if you don't need to, but you probably should!",
    type: 'specific',
    value: 'LAST_NAME'},
  {
    isRequired: true,
    tip: "Email is required and unique for each signer. You don't have to use this field in your template if you don't need to.",
    type: 'specific',
    value: 'EMAIL'}
];

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

// Makes sure there's always the 3 default placeholders (FIRST_NAME, LAST_NAME, EMAIL)
TemplateSchema.pre('save', function(next) {
  // The users will never be able to input these placeholders because they're
  // added directly at creation, meaning users can't input them on the client side,
  // allowing us to safely attach them on without duplication here.
  if (!Array.isArray(this.placeholders)) {
    this.placeholders = REQUIRED_PLACEHOLDERS;
  } else {
    this.placeholders = this.placeholders.concat(REQUIRED_PLACEHOLDERS);    
  }
  next();
});


TemplateSchema.statics.updateTemplate = function(stringId, data) {
  return new Promise((resolve, reject) => {
    // Sanitizes the HTML text to remove any malicious tags
    const sanitizedData = set(data, 'body', xss(data.body));
    
    this.findOne(ObjectId(stringId), (err, template) => {
      if (err) return reject(err);
      if (!template) return reject('Sorry but this template doesn\'t exist...');
      // Whitelisting what attributes are set... Just in case ;)
      template.body = sanitizedData.body;
      template.placeholders = sanitizedData.placeholders;
      template.rawText = sanitizedData.rawText;
      template.title = sanitizedData.title;
      template.save((err, template) => {
        if (err) return reject(err);
        resolve(template.toObject());
      });
    });

  });
}

// Must export prior to declaring and using other models due to dependency and loading issues.
export default mongoose.model('Template', TemplateSchema);