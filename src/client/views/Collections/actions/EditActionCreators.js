import http, {endpoints} from '../../../utils/http';
import {
  SET_COLLECTION_BEING_EDITED,
  UPDATE_COLLECTION_SUCCESS
} from './ActionTypes';
import {createFlashMessage} from '../../../actions/AppActionCreators';

export default {


  /**
   * Sets a collection to be edited
   * @param  {Immutable.Map} collection - The collection being edited
   * @return {Object} The action
   */
  set(collection) {
    return {
      type: SET_COLLECTION_BEING_EDITED,
      data: {collection}
    };
  },

  /**
   * Sends an API call to update the collection passed in
   * @param  {String} collectionId   - The `_id` of the collection we're updating
   * @param  {Object} collectionData - The new collection data
   * @return {Function} - The thunk that makes the API call
   */
  update(collectionId, collectionData) {
    return (dispatch) => {
      http.post(endpoints.collections.update.path, {collectionId, collectionData})
        .then(({collection}) => {
          // Reset the `collection` being edited after we've updated it
          dispatch({
            type: UPDATE_COLLECTION_SUCCESS,
            data: {collection}
          });
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  }

};
