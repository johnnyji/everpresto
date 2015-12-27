import Immutable from 'immutable';
import CollectionActionTypes from '.././action_types/CollectionActionTypes';

const {
  CREATE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  FETCH_COLLECTIONS_SUCCESS,
  RESET_COLLECTION_BEING_EDITED,
  RESET_SHOULD_FETCH_COLLECTIONS,
  SET_COLLECTION_BEING_EDITED,
  UPDATE_COLLECTION_SUCCESS} = CollectionActionTypes;

const initialState = Immutable.fromJS({
  collectionBeingEdited: null,
  collections: [],
  shouldFetchCollections: true
});

export default function collectionsReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {
    case CREATE_COLLECTION_SUCCESS:
      const collection = Immutable.fromJS(action.data.collection);
      // Adds the newly create collection
      return state.merge({
        collectionBeingEdited: collection,
        collections: state.get('collections').unshift(collection)
      });

    case DELETE_COLLECTION_SUCCESS:
      return state.update('collections', (collections) => {
        return collections.delete(
          collections.findIndex((collection) => collection.get('_id') === action.data.deletedCollectionId)
        );
      }); 

    case FETCH_COLLECTIONS_SUCCESS:
      return state.merge({
        collections: action.data.collections,
        shouldFetchCollections: false
      });

    case RESET_SHOULD_FETCH_COLLECTIONS:
      return state.set('shouldFetchCollections', true);

    case RESET_COLLECTION_BEING_EDITED:
      return state.set('collectionBeingEdited', null);

    case SET_COLLECTION_BEING_EDITED:
      // No need to convert to Immutable.Map, because it already is.
      return state.set('collectionBeingEdited', action.data.collection);

    case UPDATE_COLLECTION_SUCCESS:
      const collections = state.get('collections');
      const collectionBeingEditedIndex = collections.findIndex((collection) => {
        return collection.get('_id') === state.getIn(['collectionBeingEdited', '_id']);
      });
      const updatedCollection = Immutable.fromJS(action.data.collection);

      return state.merge({
        collectionBeingEdited: null,
        collections: collections.splice(collectionBeingEditedIndex, updatedCollection)
      });

    default:
      return state;
  }

}