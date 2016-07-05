import config from '../../../../config/config';
import generateSignatureLink from './utils/generateSignatureLink';
import initialEmailTemplate from './templates/initialEmail.js';
import sendEmail from './utils/sendEmail';

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

    // Sends the document email to the user
    sendEmail.html(
      config.mailer.document.fromEmail,
      doc.signer.email,
      `${fromUser.account.firstName} needs you to sign something!`,
      emailHtml
    )
      .then(() => {
        cb(null, doc);
      })
      .catch((err) => {
        cb(err);
      });
  }

};

export default DocumentMailer;
