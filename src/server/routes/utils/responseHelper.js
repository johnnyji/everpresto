const ResponseHelper = {

  /**
   * Extracts the message out of the error response
   *
   * @param  {String|Object} err - The error given by the DB or a promise.
   * @return {String}            - The extracted error message
   */
  extractErrorMessage(err) {
    if (typeof err === 'string') return err;
    return this.findFirstErrorMessage(err);
  },

  /**
   * Finds the first error message from the response object given back by Mongoose
   * after a write to the database.
   *
   * @param  {Object} response - The error object returned
   * @return {String}          - The error message
   */
  findFirstErrorMessage(response) {
    return response.errors[Object.keys(response.errors)[0]].message;
  }

};

export default ResponseHelper;