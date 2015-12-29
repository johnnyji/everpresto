import mongoose from 'mongoose';

const {model, Schema} = mongoose;
const {ObjectId} = Schema.Types;

const Collection = model('Collection');
const Document = model('Document');
const Template = model('Template');
const User = model('User');

const CompanySchema = new Schema({
  name: {
    type: String,
    required: 'What\'s your company\'s name?'
  }
}, {
  timestamps: true
});

// Removes all associated documents before it is removed
CompanySchema.pre('remove', function(next) {
  Template.remove({_company: this._id}).exec();
  Document.remove({_company: this._id}).exec();
  Collection.remove({_company: this._id}).exec();
  User.remove({_company: this._id}).exec();
  next();
});

export default CompanySchema;