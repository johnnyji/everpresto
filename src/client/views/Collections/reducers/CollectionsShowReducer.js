import {
  FETCH_COLLECTION_BEING_VIEWED,
  FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
  FETCH_COLLECTION_BEING_VIEWED_ERROR,
} from '../actions/ActionTypes';
import {fromJS} from 'immutable';
import createReducer from 'create-reducer-redux';

const initialState = fromJS({
  collection: null,
  fetching: false,
  fetched: false,
  fetchError: false
});

export default createReducer(initialState, {

  name: 'CollectionsShowReducer',

  handlers: {
    onFetching: FETCH_COLLECTION_BEING_VIEWED,
    onFetchError: FETCH_COLLECTION_BEING_VIEWED_ERROR,
    onFetched: FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
  },

  onFetched(state, {collection}) {
    return state.merge({
      collection,
      fetching: false,
      fetched: true,
      fetchError: null
    });
  },

  onFetching(state) {
    return state.merge({
      collection: null,
      fetching: true,
      fetched: false,
      fetchError: null
    });
  },

  onFetchError(state, {error}) {
    return state.merge({
      collection: null,
      fetching: false,
      fetched: true,
      fetchError: error
    });
  }

});
