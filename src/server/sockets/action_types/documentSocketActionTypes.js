// TODO: Why can we not use import/export syntax here? Throws `invalid token import` error
const createReducerRedux = require('create-reducer-redux');

module.exports = createReducerRedux.createConstants([
  'DOCUMENT_SEND_EMAIL_ERROR',
  'DOCUMENT_SEND_EMAIL_SUCCESS',
  'DOCUMENT_SEND_EMAILS_COMPLETE'
]);