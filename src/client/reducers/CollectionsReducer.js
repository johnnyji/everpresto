import Immutable from 'immutable';
import CollectionActionTypes from '.././action_types/CollectionActionTypes';

const {
  CREATE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  FETCH_COLLECTIONS_SUCCESS,
  RESET_SHOULD_FETCH_COLLECTIONS} = CollectionActionTypes;

const initialState = Immutable.fromJS({
  collections: [],
  shouldFetchCollections: true
});

export default function collectionsReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {
    case CREATE_COLLECTION_SUCCESS:
      // Adds the newly create collection
      return state.update('collections', (collections) => {
        return collections.unshift(Immutable.fromJS(action.data.collection))
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

    default:
      return state;
  }

}