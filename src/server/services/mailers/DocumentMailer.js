import config from '../../../../config/config';
import sendgrid from 'sendgrid';
import secrets from '../../../../secrets.json';
import initialEmailTemplate from './templates/initialEmail.js';

const mailer = sendgrid(secrets.sendgrid.apiKey);

const DocumentMailer = {

  sendInitialEmails(docs, creator) {
    // Iterates through each signer
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
      debugger;
      // Sends doc to the the signer to sign 
      mailer.send({
        to: doc.signer.email,
        from: config.mailer.document.fromEmail,
        subject: `${creator.account.firstName} ${creator.account.lastName} needs you to sign something!`,
        html: emailHtml
      }, (err, json) => {
        debugger;
      });
    });
  }
};

export default DocumentMailer;
