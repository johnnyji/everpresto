import config from '../../../../config/config';
import generateSignatureLink from './utils/generateSignatureLink';
import initialEmailTemplate from './templates/initialEmail.js';
import secrets from '../../../../secrets.json';
import sendgrid from 'sendgrid';

const mailer = sendgrid(secrets.sendgrid.apiKey);

const DocumentMailer = {

  /**
   * Sends an initial email to a signer once a document has been
   * created to inform them that they need to sign the document
   * @param {Object} options - The argument options
   * @param {Object} options.doc - The document we need to email and get the signer to sign
   * @param {Object} options.fromUser - The user that created the document
   * @param {Function} - The callback function that's executed once an email attempt has occured
   */
  sendInitialEmail ({doc, fromUser}, cb) {
    const emailHtml = initialEmailTemplate({
      sender: {
        firstName: fromUser.account.firstName,
        lastName: fromUser.account.lastName
      },
      signer: {
        firstName: doc.signer.firstName,
        lastName: doc.signer.lastName
      },
      signatureLink: generateSignatureLink(doc, doc.signer)
    });
    debugger;

    // Sends the document email to the user
    mailer.send({
      to: doc.signer.email,
      from: config.mailer.document.fromEmail,
      subject: `${fromUser.account.firstName} ${fromUser.account.lastName} needs you to sign something!`,
      html: emailHtml
    }, (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null, doc);
      }
    });
  }

};

export default DocumentMailer;
