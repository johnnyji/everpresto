import http, {endpoints} from '../utils/http';
import {createFlashMessage} from '../../../actions/AppActionCreators';
import CollectionActionTypes from './ActionTypes';

export default {

  /**
   * Fetches the collection previews for the current user
   * @return {Function} - The thunk that makes the API call
   */
  fetch() {
    return (dispatch) => {
      http.get(endpoints.collections.index.path)
        .then(({collections}) => {
          dispatch(this.fetchCollectionsSuccess(collections));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },


  /**
   * Handles the collections previews returned
   * @param  {Array} collections - The current user's collections
   * @return {Object}            - The data passed to the Collection Reducer
   */
  fetchSuccess(collections) {
    return {
      type: CollectionActionTypes.FETCH_COLLECTIONS_SUCCESS,
      data: {collections}
    };
  }

};
