const ResponseHelper = {

  /**
   * Extracts the message out of the error response
   *
   * @param  {String|Object} err - The error given by the DB or a promise.
   * @return {String}            - The extracted error message
   */
  extractErrorMessage(err) {
    if (typeof err === 'string') return err;
    return response.errors[Object.keys(response.errors)[0]].message;
  },

  /**
   * Converts model instances to objects
   *
   * @param  {[type]} models [description]
   * @return {[type]}        [description]
   */
  toObjects(models) {
    return models.map((model) => model.toObject());
  }

};

export default ResponseHelper;