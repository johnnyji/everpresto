'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var formApiPath = function formApiPath(path, method) {
  return {
    path: '/api' + path,
    method: method
  };
};

var apiEndpoints = {
  currentUser: {
    show: formApiPath('/auth/currentUser', 'GET')
  },
  users: {
    create: formApiPath('/auth/register', 'POST'),
    login: formApiPath('/auth/login', 'POST')
  },
  timesheets: {
    create: formApiPath('/timesheets', 'POST'),
    collection: formApiPath('/timesheets', 'GET'),
    'delete': formApiPath('/timesheets', 'DELETE')
  }
};

exports['default'] = apiEndpoints;
module.exports = exports['default'];