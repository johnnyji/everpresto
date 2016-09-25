import http, {endpoints} from '../../../utils/http';
import {
  FETCH_COLLECTION_BEING_VIEWED,
  FETCH_COLLECTION_BEING_VIEWED_ERROR,
  FETCH_COLLECTION_BEING_VIEWED_SUCCESS
} from './ActionTypes';

export default {

  fetch(id) {
    return (dispatch) => {
      // Initiate fetch
      dispatch({type: FETCH_COLLECTION_BEING_VIEWED});

      http.get(endpoints.collections.show(id).path)
        .then(({collection}) => {
          debugger;
          dispatch({
            type: FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
            data: {collection}
          });
        })
        .catch(({message}) => {
          dispatch({
            type: FETCH_COLLECTION_BEING_VIEWED_ERROR,
            data: {error: message}
          });
        });
    };
  }

};
