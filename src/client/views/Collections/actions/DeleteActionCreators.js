import http, {endpoints} from '../utils/http';
import {createFlashMessage} from '../../../actions/AppActionCreators';
import CollectionActionTypes from './ActionTypes';

export default {

  delete(collectionId) {
    return (dispatch) => {
      http.delete(endpoints.collections.delete(collectionId).path)
        .then(() => {
          dispatch(this.deleteCollectionSuccess(collectionId));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  deleteCollectionSuccess(deletedCollectionId) {
    return {
      type: CollectionActionTypes.DELETE_COLLECTION_SUCCESS,
      data: {deletedCollectionId}
    };
  }

};
