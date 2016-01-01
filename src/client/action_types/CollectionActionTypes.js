const CollectionActionTypes = {
  CREATE_COLLECTION_SUCCESS: 'CREATE_COLLECTION_SUCCESS',
  DELETE_COLLECTION_SUCCESS: 'DELETE_COLLECTION_SUCCESS',

  FETCH_COLLECTION_BEING_VIEWED_SUCCESS: 'FETCH_COLLECTION_BEING_VIEWED_SUCCESS',
  RESET_COLLECTION_BEING_VIEWED: 'RESET_COLLECTION_BEING_VIEWED',

  FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
  FETCH_COLLECTIONS_ERROR: 'FETCH_COLLECTIONS_SUCCESS',

  RESET_SHOULD_FETCH_COLLECTIONS: 'RESET_SHOULD_FETCH_COLLECTIONS',

  SET_COLLECTION_BEING_EDITED: 'SET_COLLECTION_BEING_EDITED',
  RESET_COLLECTION_BEING_EDITED: 'RESET_COLLECTION_BEING_EDITED',

  UPDATE_COLLECTION_SUCCESS: 'UPDATE_COLLECTION_SUCCESS'
}

export default CollectionActionTypes;