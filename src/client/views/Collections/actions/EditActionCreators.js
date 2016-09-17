import http, {endpoints} from '../utils/http';
import CollectionActionTypes from './ActionTypes';
import {createFlashMessage} from '../../../actions/AppActionCreators';

export default {

  /**
   * Sends an API call to update the collection passed in
   * @param  {String} collectionId   - The `_id` of the collection we're updating
   * @param  {Object} collectionData - The new collection data
   * @return {Function} - The thunk that makes the API call
   */
  updateCollection(collectionId, collectionData) {
    return (dispatch) => {
      http.post(endpoints.collections.update.path, {collectionId, collectionData})
        .then(({collection}) => {
          // Reset the `collection` being edited after we've updated it
          dispatch(this.updateCollectionSuccess(collection));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  },

  /**
   * Handles the success return of the collection update
   * @param  {Object} collection - The collection that was just updated
   * @return {Object}            - The data passed to the Collection Reducer
   */
  updateCollectionSuccess(collection) {
    return {
      type: CollectionActionTypes.UPDATE_COLLECTION_SUCCESS,
      data: {collection}
    };
  }

};
