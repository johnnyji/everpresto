const createNestedObject = (keys, finalValue, baseObj = {}, splitIndicator = ':') => {
  // If keys was a string "these:are:the:keys", then we split them by the indicator
  // so that it becomes an array of keys
  if (keys.constructor === String) keys = keys.split(splitIndicator);
  
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