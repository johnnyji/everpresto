import mongoose from 'mongoose';
// Models must be imported from their direct source file due to cross-model dependency issues. See README
import Collection from './Collection';
import Document from './Document';
import Template from './Template';
import User from './User';

const Schema = mongoose.Schema;

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

CompanySchema.statics.createWithUser = function(company, user) {
  return new Promise((resolve, reject) => {
    this.create({name: company.name}, (err, company) => {
      if (err) return reject(err);
      if (!company) return reject('The company you were looking for wasn\'t found');

      // Creates the user as an admin of the company if the company was successfully created
      User.register(user, company.id, 'admin')
        .then((user) => {
          resolve({company: company.toObject(), user});
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export default mongoose.model('Company', CompanySchema);
