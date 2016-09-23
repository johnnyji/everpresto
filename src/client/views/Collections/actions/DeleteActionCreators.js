import http, {endpoints} from '../../../utils/http';
import {createFlashMessage} from '../../../actions/AppActionCreators';
import {DELETE_COLLECTION_SUCCESS} from './ActionTypes';

export default {

  destroy(collectionId) {
    return (dispatch) => {
      http.delete(endpoints.collections.delete(collectionId).path)
        .then(() => {
          dispatch({
            type: DELETE_COLLECTION_SUCCESS,
            data: {deletedCollectionId: collectionId}
          });
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  }

};
