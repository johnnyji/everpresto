/**
 * Takes in a string of keys and a final value, and creates a nested object with those keys and the
 * value at the end.
 *
 * @param  {Array|String} keys - A string of keys seperated by a special indicator ("these:are:the:keys"), or the already   seperated array
 * @param  {*} finalValue - The final value of the nested object
 * @param  {Object} baseObj - The initial starting object
 * @param  {String} splitIndicator - The indicator that will split the string of keys
 * @return {Object} - The nested objected
 */
const createNestedObject = (keys, finalValue, baseObj = {}, splitIndicator = ':') => {
  // We want to split the keys by their split indicator
  if (!Array.isArray(keys)) keys = keys.split(splitIndicator);
  
  // Reduces from right to left, taking the final value as the initial starting point,
  // creates a new object with the final value and the last key, and sets that object
  // as the new reduced value, and keeps doing so until the entire array of keys have
  // been nested
  return keys.reduceRight((pastResult, currentKey) => {
    const obj = {};
    obj[currentKey] = pastResult;
    return obj;
  }, finalValue);

}


export default createNestedObject;