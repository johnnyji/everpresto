// TODO: Why can we not use import/export syntax here? Throws `invalid token import` error
const createConstants = require('../../../client/action_types/utils/createConstants');

module.exports = createConstants([
  'DOCUMENT_SEND_EMAIL_ERROR',
  'DOCUMENT_SEND_EMAIL_SUCCESS',
  'DOCUMENT_SEND_EMAILS_COMPLETE'
]);