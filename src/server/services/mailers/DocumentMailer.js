import config from '../../../../config/config';
import sendgrid from 'sendgrid';
import secrets from '../../../../secrets.json';
import initialEmailTemplate from './templates/initialEmail.js';

const mailer = sendgrid(secrets.sendgrid.apiKey);

const DocumentMailer = {

  /**
   * Sends emails to signers alerting them that they have a document to sign 
   * @params {array} docs - Documents that each need to be emailed to a signer
   * @params {object} docs - The user that created the documents to be sent
   * @returns {array} - A list of any documents that were unsuccessfully send, each with
   *                    an error explaining why: {doc: {...}, error: {...}}
   */
  sendInitialEmails(docs, creator) {
    // This amount of errors in sending emails
    const errors = [];

    // Attempts to send an email for each signer
    docs.forEach((doc) => {
      const emailHtml = initialEmailTemplate({
        sender: {
          firstName: creator.account.firstName,
          lastName: creator.account.lastName,
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
        // Whenever an email is not send properly, we record it in an array we return
        if (err) errors.push({doc, error: err});
      });
    });

    return errors;
  }
};

export default DocumentMailer;
