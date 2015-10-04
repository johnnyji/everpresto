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
    show: formApiPath('/user/currentUser', 'POST')
  },
  users: {
    create: formApiPath('/auth/register', 'POST'),
    login: formApiPath('/auth/login', 'POST'),
    logout: formApiPath('/auth/logout', 'GET'),
    authenticateWithToken: formApiPath('/auth/authenticate_with_token', 'POST')
  },
  notes: {
    create: formApiPath('/notes', 'POST')
  },
  groups: {
    show: formApiPath('/groups/active', 'GET')
  }
};

exports['default'] = apiEndpoints;
module.exports = exports['default'];