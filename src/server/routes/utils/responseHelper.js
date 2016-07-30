/**
 * Extracts the message out of the error response
 * @param  {String|Object} err - The error given by the DB or a promise.
 * @return {String}            - The extracted error message
 */
export const extractErrorMessage = (err) => {
  if (typeof err === 'string') return err;
  return err.errors[Object.keys(err.errors)[0]].message;
};
