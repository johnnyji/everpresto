import curry from 'lodash/curry';
import Immutable from 'immutable';

/**
 * A collection of util functions on `Immutable.List`
 */
const ListFunctions = {

  /**
   * Adds an item to the front of a list
   * @param  {*} item               - The item to be unshifted
   * @param  {Immtutable.List} list - The list we're adding onto
   * @return {Immutable.List}       - The new list
   */
  unshift: curry((item, list) => {
    if (Immutable.is(item)) return list.unshift(item);
    return list.unshift(Immutable.fromJS(item));
  })
  
};

export default ListFunctions;