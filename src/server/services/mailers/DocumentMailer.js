import config from '../../../../config/config';
import initialEmailTemplate from './templates/initialEmail.js';
import Rx from 'rxjs/Rx';
import secrets from '../../../../secrets.json';
import sendgrid from 'sendgrid';

const mailer = sendgrid(secrets.sendgrid.apiKey);

const DocumentMailer = {

  sendInitialEmail$$ (doc, fromUser) {
    // Creates the HTML email from the email template,
    // and replaces placeholder fields with the users information
    return Rx.Observable.create((observer) => {
      const emailHtml = initialEmailTemplate({
        sender: {
          firstName: fromUser.account.firstName,
          lastName: fromUser.account.lastName
        },
        signer: {
          firstName: doc.signer.firstName,
          lastName: doc.signer.lastName
        }
      });

      // Sends the document email to the user
      mailer.send({
        to: doc.signer.email,
        from: config.mailer.document.fromEmail,
        subject: `${fromUser.account.firstName} ${fromUser.account.lastName} needs you to sign something!`,
        html: emailHtml
      }, (err) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
      });
      observer.complete();
    });

  },

  /**
   * Sends emails to signers alerting them that they have a document to sign
   * @params {array} docs - Documents that each need to be emailed to a signer
   * @params {object} docs - The user that created the documents to be sent
   * @params {function} handleUnsentDocs - Callback to update all the unsent docs
   * @params {function} handleSentDocs - Callback to update all the sent docs
   * an error explaining why: {doc: {...}, error: {...}}
   */
  sendInitialEmails(docs, creator, handleUnsentDocs, handleSentDocs) {
    const unsentDocs = [];
    const sentDocs = [];

    // Attempts to send an email for each signer
    docs.forEach((doc) => {
      const emailHtml = initialEmailTemplate({
        sender: {
          firstName: creator.account.firstName,
          lastName: creator.account.lastName
        },
        signer: {
          firstName: doc.signer.firstName,
          lastName: doc.signer.lastName
        }
      });
      // Sends doc to the the signer to sign
      mailer.send({
        to: doc.signer.email,
        from: config.mailer.document.fromEmail,
        subject: `${creator.account.firstName} ${creator.account.lastName} needs you to sign something!`,
        html: emailHtml
      }, (err, json) => {
        // Whenever an email is not send properly
        if (err) unsentDocs.push(doc);
        // Whenever an email is sent successfully
        if (json) sentDocs.push(doc);
      });
    });
    handleUnsentDocs(unsentDocs);
    handleSentDocs(sentDocs);
  }

};

export default DocumentMailer;
