'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var requireUser = function requireUser(req, res, next) {
  req.session.userId ? next() : res.redirect('/');
};

exports['default'] = requireUser;
module.exports = exports['default'];