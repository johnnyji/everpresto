import sendgrid from 'sendgrid';
import secrets from '../../../../../secrets.json';

const mailer = sendgrid.SendGrid(secrets.sendgrid.apiKey);
const mailerHelper = sendgrid.mail;

export default {

  /**
   * Sends an HTML email using SendGrid
   * @param {String} fromEmail - The senders email
   * @param {String} toEmail - The recepients email
   * @param {String} subject - The subject of the email
   * @param {String} html - The contet of the email
   * @returns {Promise} - A promise of the sending email
   */
  html(fromEmail, toEmail, subject, html) {
    return new Promise((resolve, reject) => {
      const to = new mailerHelper.Email(toEmail);
      const from = new mailerHelper.Email(fromEmail);
      const content = new mailerHelper.Content('text/html', html);
      const mail = new mailerHelper.Mail(from, subject, to, content);
      const request = mailer.emptyRequest();

      request.method = 'POST';
      request.path = '/v3/mail/send';
      request.body = mail.toJSON();

      mailer.API(request, ({body, statusCode}) => {
        if (statusCode > 199 && statusCode < 299) {
          resolve();
          return;
        }
        reject(body);
      });
    });
  }

};
