import config from '../../../../config/config';
import fs from 'fs';
import Handlebars from 'handlebars';
import sendgrid from 'sendgrid';
import secrets from '../../../../secrets.json';

const mailer = sendgrid(secrets.sendgrid.apiKey);

const DocumentMailer = {

  sendInitialEmails(docs, creator) {
    // TODO: Why can't this file be read properly?
    const emailTemplate = fs.readFileSync('templates/initial_email.hbs', 'utf-8');
    debugger;
    const compiledTemplate = Handlebars.compile(emailTemplate);

    // Iterates through each signer
    docs.forEach((doc) => {
      const emailHtml = compiledTemplate({
        sender: {
          firstName: creator.account.firstName,
          lastName: creator.account.lastName
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
