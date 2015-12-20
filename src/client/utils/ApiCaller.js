import Promise from 'bluebird';

const ApiCaller = {

  // this method assumes that you are sending/receiving JSON
  // options: { url: ..., method:..., data:... }
  sendAjaxRequest(options) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(options.method, options.url);
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      console.log(`Sending ${options.method} Request to ${options.url}`);
      options.data ? request.send(JSON.stringify(options.data)) : request.send();
      
      request.onload = () => {
        debugger;
        // we don't need to parse it if it's an empty string
        const responseText = request.responseText
          ? JSON.parse(request.responseText)
          : request.responseText;

        const result = {
          status: request.status,
          data: responseText
        };
        
        result.status >= 200 && result.status <= 299
          ? resolve(result)
          : reject(result);
        console.log('Response: ', result.data);
      };

      request.onerror = () => reject({status: 500, data: 'Connection error'});
    });
  }

}

export default ApiCaller;