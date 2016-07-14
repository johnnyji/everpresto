// TODO: Why can we not use import/export syntax here? Throws `invalid token import` error
const config = require('../../../../config/config');

module.exports = {
  paths: {
    client: {
      collections: `${config.baseUrl}/collections`,
      documents: `${config.baseUrl}/documents`
    },
    server: {
      collections: '/collections',
      documents: '/documents'
    }
  }
};