import curry from 'lodash/curry';

/**
 * A collection of curried functions on `Immutable.Map`
 */
const MapFunctions = {

  /**
   * Returns attribute on a map
   * @param  {String} attr                   - The name of the attribute on the predicate
   * @param  {Immutable.Map} predicate       - The map in question
   */
  getAttr: curry((attr, predicate) => {
    return predicate.get(attr);
  })
  
};

export default MapFunctions;