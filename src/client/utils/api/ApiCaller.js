import path from 'path';
import config from '../../../.././config';

export default class ApiCaller {
  constructor() {
    this.urlPrefix = config.apiUrlPrefix;
  }

  // this method assumes that you are sending/receiving JSON
  // options: { url: ..., method:..., data:... }
  _sendAjaxRequest(options) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(options.method, options.url);

      request.onload = () => {
        let result = {
          status: request.status,
          data: JSON.parse(request.responseText)
        };
        if (result.status >= 200 && result.status <= 299) {
          console.log('Response: ', result.data);
          resolve(result);
        } else {
          console.log('Response: ', result.data);
          reject(result);
        }
      };

      request.onerror = () => {
        console.log('Response: ', result.data);
        reject({ status: 500, data: 'Connection error' });
      }

      if (options.data == null) {
        console.log(`Sending ${options.method} Request to ${options.url}`);
        request.send();
      } else {
        console.log(`Sending ${options.method} Request to ${options.url}`);
        request.send(options.data);
      }
    });
  }

}