/**
 * Generates a link that takes the user to a document signing page
 * @param {Object} doc - The document that needs to be signed
 * @returns {String} - The URL string thats needed to access the signature page
 */
export default (doc) => {
  const baseUrl = process.env.NODE_ENV === 'production' ?
    'http://everpresto.com' : 'http://localhost:3000';
  return `${baseUrl}/document/${doc.id}/sign/${doc.signatureLinkToken}`;
};
