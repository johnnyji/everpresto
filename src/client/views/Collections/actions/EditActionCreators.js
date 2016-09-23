import http, {endpoints} from '../../../utils/http';
import {UPDATE_COLLECTION_SUCCESS} from './ActionTypes';
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
