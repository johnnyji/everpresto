/**
 * Finds the first error message from the response object given back by Mongoose
 * after a write to the database.
 *
 * @param  {Object} response - The error object returned
 * @return {String}          - The error message
 */
const findFirstErrorMessage = (response) => {
  return response.errors[Object.keys(response.errors)[0]].message;
};

export default {findFirstErrorMessage};