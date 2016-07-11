import config from '../../../../../config/config';
/**
 * Generates a link that takes the user to a document signing page
 * @param {Object} doc - The document that needs to be signed
 * @returns {String} - The URL string thats needed to access the signature page
 */
export default (doc) => {
  const id = typeof doc._id === 'string' ?
    doc._id : doc._id.toString();

  const baseUrl = process.env.NODE_ENV === 'production' ?
      config.production.baseUrl :
      config.development.baseUrl;
  return `${baseUrl}/sign_document/${id}/token/${doc.signatureLinkToken}`;
};
