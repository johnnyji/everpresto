import camelCaseObject from 'camelcase-object';

const buildHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

const http = {

  delete(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        method: 'delete',
        headers: buildHeaders()
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  get(path) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        headers: buildHeaders()
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  post(path, data) {
    return new Promise((resolve, reject) => {
      return fetch(path, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data)
      })
        .then((response) => {
          // We must retrieve the status first, it will be lost after we call `response.json`
          const {status} = response;
          // Parse and return the JSON representation
          response.json()
            .then((json) => {
              if (status >= 200 && status < 300) {
                return resolve(camelCaseObject(json));
              }
              reject(json);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  },

  toJson(response) {
    return response.json();
  }

};

export default http;
