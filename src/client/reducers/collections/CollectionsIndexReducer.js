import {
  CREATE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_SUCCESS,
  FETCH_COLLECTIONS_SUCCESS,
  RESET_SHOULD_FETCH_COLLECTIONS,
  RESET_COLLECTION_BEING_VIEWED,
  UPDATE_COLLECTION_SUCCESS} from '../.././action_types/CollectionActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  collections: [],
  shouldFetchCollections: true,
});

export default function CollectionsIndexReducer(state = initialState, action) {
  switch (action.type) {

    case CREATE_COLLECTION_SUCCESS:
      const collection = Immutable.fromJS(action.data.collection);
      return state.update('collections', (collections) => collections.unshift(collection));

    case FETCH_COLLECTIONS_SUCCESS:
      return state.merge({
        collections: action.data.collections,
        shouldFetchCollections: false
      });

    case DELETE_COLLECTION_SUCCESS:
      return state.update('collections', (collections) => {
        return collections.delete(
          collections.findIndex((collection) => collection.get('id') === action.data.deletedCollectionId)
        );
      });

    case RESET_SHOULD_FETCH_COLLECTIONS:
      return state.set('shouldFetchCollections', true);

    case UPDATE_COLLECTION_SUCCESS:
      const updatedCollection = Immutable.fromJS(action.data.collection);
      const updatedCollectionIndex = state
        .get('collections')
        .findIndex((collection) => collection.get('id') === updatedCollection.get('id'));
      // Sets the appropriate collection in the list to the newly updated collection
      return state.update('collections', (collections) => {
        return collections.splice(updatedCollectionIndex, 1, updatedCollection);
      });

    default:
      return state;

  }
};