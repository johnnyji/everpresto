import {
  FETCH_COLLECTION_BEING_VIEWED,
  FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
  FETCH_COLLECTION_BEING_VIEWED_ERROR,
} from '../actions/ActionTypes';
import {fromJS} from 'immutable';

const initialState = fromJS({
  collection: null,
  fetching: false,
  fetched: false,
  fetchError: null
});

export default (state = initialState, {type, data}) => {
  switch (type) {

    case FETCH_COLLECTION_BEING_VIEWED:
      return state.merge({
        collection: null,
        fetching: true,
        fetched: false,
        fetchError: null
      });

    case FETCH_COLLECTION_BEING_VIEWED_SUCCESS:
      return state.merge({
        collection: data.collection,
        fetching: false,
        fetched: true,
        fetchError: null
      });

    case FETCH_COLLECTION_BEING_VIEWED_ERROR:
      return state.merge({
        collection: null,
        fetching: false,
        fetched: true,
        fetchError: data.error
      });

    default:
      return state;
  }
};
