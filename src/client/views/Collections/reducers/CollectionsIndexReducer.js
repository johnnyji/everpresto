import {
  CREATE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  FETCH_COLLECTION_PREVIEWS,
  FETCH_COLLECTION_PREVIEWS_ERROR,
  FETCH_COLLECTION_PREVIEWS_SUCCESS,
  UPDATE_COLLECTION_SUCCESS
} from '../actions/ActionTypes';
import createReducer from 'create-reducer-redux';
import {fromJS} from 'immutable';

const initState = fromJS({
  fetchError: null,
  fetched: false,
  fetching: false,
  collectionPreviews: []
});

export default createReducer(initState, {

  name: 'CollectionsIndexReducer',

  handlers: {
    onCreate: [CREATE_COLLECTION_SUCCESS],
    onDelete: [DELETE_COLLECTION_SUCCESS],
    onFetching: [FETCH_COLLECTION_PREVIEWS],
    onFetchError: [FETCH_COLLECTION_PREVIEWS_ERROR],
    onFetched: [FETCH_COLLECTION_PREVIEWS_SUCCESS],
    onUpdate: [UPDATE_COLLECTION_SUCCESS]
  },

  onCreate(state, {collectionPreview}) {
    return state.update('collectionPreviews', (previews) => previews.unshift(collectionPreview));
  },

  onFetchError(state, {error}) {
    return state.merge({
      fetching: false,
      fetched: true,
      fetchError: error
    });
  },

  onFetched(state, {collectionPreviews}) {
    return state.merge({
      collectionPreviews,
      fetching: false,
      fetched: true,
      fetchError: null
    });
  },

  onFetching(state) {
    return state.merge({
      fetching: true,
      fetched: false,
      fetchError: null
    });
  },

  onDelete(state, {deletedCollectionId}) {
    const index = state.get('collectionPreviews').findIndex((c) => c.get('id') === deletedCollectionId);
    return state.update('collectionPreviews', (previews) => previews.delete(index));
  },

  onUpdate(state, {collectionPreview}) {
    const updated = fromJS(collectionPreview);
    const updatedIndex = state
      .get('collectionPreviews')
      .findIndex((preview) => preview.get('id') === updated.get('id'));

    // Updates the correct preview in the list
    return state.update('collectionPreviews', (previews) => previews.splice(updatedIndex, 1, updated));
  }

});
