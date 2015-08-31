import path from 'path';
import config from '../../.././config';

export default class ApiCaller {

  // this method assumes that you are sending/receiving JSON
  // options: { url: ..., method:..., data:... }
  static sendAjaxRequest(options) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(options.method, options.url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      console.log(`Sending ${options.method} Request to ${options.url}`);

      options.data ? request.send(JSON.stringify(options.data)) : request.send();
      
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
        reject({ status: 500, data: 'Connection error' });
      }
    });
  }

}