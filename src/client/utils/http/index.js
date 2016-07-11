import camelCaseObject from 'camelcase-object';
import config from '../../../../config/config';

const buildHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

const buildFullPath = (path) => {
  if (process.env.NODE_ENV === 'production') {
    return `${config.production.baseUrl}${path}`;
  }
  return `${config.development.baseUrl}${path}`;
};

const http = {

  delete(path, data = {}) {
    return new Promise((resolve, reject) => {
      return fetch(buildFullPath(path), {
        credentials: 'include',
        method: 'delete',
        headers: buildHeaders(),
        data: JSON.stringify(data)
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
      return fetch(buildFullPath(path), {
        credentials: 'include',
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

  post(path, data = {}) {
    return new Promise((resolve, reject) => {
      return fetch(buildFullPath(path), {
        // This is important to persist session data (userId)
        credentials: 'include',
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
