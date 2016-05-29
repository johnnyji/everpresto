/* eslint-disable object-shorthand */

/**
 * Creates an object full of action type constants by providing an array of constants
 * @param {Array} constants - An array of action type constant names
 * @returns {undefined}
 */
export default (constants) => {
  return constants.reduce((accumConstants, currConstant) => {
    return Object.assign({}, accumConstants, {[currConstant]: currConstant});
  }, {});
};

/* eslint-enable object-shorthand */
