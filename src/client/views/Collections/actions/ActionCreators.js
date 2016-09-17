import http, {endpoints} from '../utils/http';
import {createFlashMessage} from '../../../actions/AppActionCreators';
import CollectionActionTypes from './ActionTypes';

export default {

  create: require('./CreateActionCreators'),
  delete: require('./DeleteActionCreators'),
  edit: require('./EditActionCreators'),
  previews: require('./PreviewActionCreators'),

  /**
   * Fetches the collection being viewed, along with it's documents
   * @param  {String} id - The `_id` of the collection we're fetching
   * @return {Function}  - The thunk that makes the API call
   */
  fetchCollection(id) {
    return (dispatch) => {
      const {path} = endpoints.collections.show(id);

      http.get(path)
        .then(({collection}) => {
          dispatch(this.fetchCollectionBeingViewedSuccess(collection));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  /**
   * Handles the collection returned from the collection show fetch
   * @param  {Array} collections - The collection returned from the API
   * @return {Object}            - The data passed to the Collection Reducer
   */
  fetchCollectionSuccess(collection) {
    return {
      type: CollectionActionTypes.FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
      data: {collection}
    };
  }

};
