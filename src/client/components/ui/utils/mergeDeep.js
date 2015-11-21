export default function deepMerge (left, right) {

  const rightIsArray = Array.isArray(right);

  // If the right (source) is an array, then we want to make the final merge object
  // an array as well, otherwise it will be an object
  let final = rightIsArray && [] || {};

  if (rightIsArray) {

    left = left || [];

    // Move all the contents of left onto final first.
    final = final.concat(left);

    // Iterate through the right (source)
    right.forEach((element, i) => {
      if (typeof final[i] === 'undefined') {
        // If the final array is shorter than the right array, we simply set the element
        // at the missing index equal to whatever the element is on the right array
        final[i] = element;
      } else if (typeof element === 'object') {
        // If the element on the right is an object, we need to call this method again
        // and parse that object, once we do, we can set it to the correct index on the final array
        final[i] = deepMergeRightIntoLeft(left[i], element);
      } else {
        // If the element is present on the left array, it means that the value previously existed
        // thefore the same version on the right array is the updated version, so we take the right version
        // (source) and push it onto the final array
        if (left.indexOf(element) === -1) final.push(element);
      }
    });

  } else {

      // If right is an Object
    if (left && typeof left === 'object') {
      // If left exists and is also an object, we copy all the K/V from left onto the final object.
      for (const key in left) {
        if (left.hasOwnProperty(key)) final[key] = left[key];
      }
    }

    for (const key in right) {
      // !right[key] handles cases when the value is `null`, since typeof(null) === 'object'
      if (typeof right[key] !== 'object' || !right[key]) {
        // If the K/V in right object is not a deeper nested object, we simply override the one on the final
        // with this one.
        final[key] = right[key];
      } else {
        // If the K/V in right object is another object (another level nested). We check to see
        // if the same key exists in the left object, if it does then we need to recursively call
        // this method until we parse entirely through the nested structure and set the current key
        // in the final object to be the return of the nested parsing.
        // However if the key doesnt exist in the left object, it means that this is an entirely new K/V
        // so therefore we can just set it directly on the final object.
        Boolean(left[key])
          ? final[key] = deepMerge(left[key], right[key])
          : final[key] = right[key];
      }
    }

  }

  return final;
}