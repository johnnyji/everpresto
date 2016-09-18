import {
  CREATE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  FETCH_COLLECTIONS_SUCCESS,
  UPDATE_COLLECTION_SUCCESS
} from '../.././action_types/CollectionActionTypes';
import createReducer from 'create-reducer-redux';
import {fromJS} from 'immutable';

const initState = {
  collectionPreviews: []
};

export default createReducer(initState, {

  name: 'CollectionsReducer',

  handlers: {
    onCreate: [CREATE_COLLECTION_SUCCESS],
    onDelete: [DELETE_COLLECTION_SUCCESS],
    onPreviewsFetched: [FETCH_COLLECTIONS_SUCCESS],
    onUpdate: [UPDATE_COLLECTION_SUCCESS]
  },

  onCreate(state, {collectionPreview}) {
    return state.update('collectionPreviews', (previews) => previews.unshift(collectionPreview));
  },

  onPreviewsFetched(state, {collectionPreviews}) {
    return state.set('collectionPreviews', fromJS(collectionPreviews));
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