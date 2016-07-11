import endpoints from '../utils/http/endpoints';
import {createFlashMessage} from './AppActionCreators';
import CollectionActionTypes from './../action_types/CollectionActionTypes';
import http from '../utils/http';

const CollectionActionCreators = {

  /**
   * Sends the AJAX request to create a collection on the server,
   * the reason why we don't send any data is because when a collection
   * is first created, it defaults to the title `Untitled` and the session
   * data is already stored on the server for `user_id`, so there's really
   * nothing for us to send
   *
   * @return {Function}                 - The thunk that makes the API call
   */
  createCollection() {
    return (dispatch) => {
      http.post(endpoints.collections.create.path)
        .then(({collection}) => {
          dispatch(this.createCollectionSuccess(collection));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },


  /**
   * Handles the successful return of a new template write
   *
   * @param  {Object} collection - The recently created collection
   * @return {Object}            - The data passed to the Collection Reducer
   */
  createCollectionSuccess(collection) {
    return {
      type: CollectionActionTypes.CREATE_COLLECTION_SUCCESS,
      data: {collection}
    };
  },


  /**
   * Executes the API call to delete a collection
   *
   * @param  {String} collectionId  The `id` of the collection to delete
   * @return {Function}  - The thunk that makes the API call
   */
  deleteCollection(collectionId) {
    const {path} = endpoints.collections.delete(collectionId);

    return (dispatch) => {
      http.delete(path)
        .then(() => {
          dispatch(this.deleteCollectionSuccess(collectionId));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },


  /**
   * Handles the success of the delete collection
   * @param  {String} deletedCollectionId - The `_id` of the recently deleted collection
   * @return {Object}                     - The data passed to the Collection Reducer
   */
  deleteCollectionSuccess(deletedCollectionId) {
    return {
      type: CollectionActionTypes.DELETE_COLLECTION_SUCCESS,
      data: {deletedCollectionId}
    };
  },


  /**
   * Fetches the collection being viewed, along with it's documents
   *
   * @param  {String} id - The `_id` of the collection we're fetching
   * @return {Function}  - The thunk that makes the API call
   */
  fetchCollectionBeingViewed(id) {
    return (dispatch) => {
      const {path} = endpoints.collections.show(id);

      http.get(path)
        .then(({collection}) => {
          dispatch(this.fetchCollectionBeingViewedSuccess(collection));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },


  /**
   * Handles the collection returned from the collection show fetch
   *
   * @param  {Array} collections - The collection returned from the API
   * @return {Object}            - The data passed to the Collection Reducer
   */
  fetchCollectionBeingViewedSuccess(collection) {
    return {
      type: CollectionActionTypes.FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
      data: {collection}
    };
  },


  /**
   * Fetches the collections for the current user
   *
   * @return {Function} - The thunk that makes the API call
   */
  fetchCollections() {
    return (dispatch) => {
      http.get(endpoints.collections.index.path)
        .then(({collections}) => {
          dispatch(this.fetchCollectionsSuccess(collections));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },


  /**
   * Handles the collections returned from the collections fetch
   *
   * @param  {Array} collections - The current user's collections
   * @return {Object}            - The data passed to the Collection Reducer
   */
  fetchCollectionsSuccess(collections) {
    return {
      type: CollectionActionTypes.FETCH_COLLECTIONS_SUCCESS,
      data: {collections}
    };
  },


  /**
   * Resets the flag for fetching collections
   *
   * @return {Object} - The data passed to the Template Reducer
   */
  resetShouldFetchCollections() {
    return {type: CollectionActionTypes.RESET_SHOULD_FETCH_COLLECTIONS};
  },


  /**
   * Resets the template being edited to no collection.
   *
   * @return {Object} - The data passed to the Collection Reducer
   */
  resetCollectionBeingEdited() {
    return {type: CollectionActionTypes.RESET_COLLECTION_BEING_EDITED};
  },


  /**
   * Resets the template being viewed to no collection.
   *
   * @return {Object} - The data passed to the Collection Reducer
   */
  resetCollectionBeingViewed() {
    return {type: CollectionActionTypes.RESET_COLLECTION_BEING_VIEWED};
  },


  /**
   * Sets the current collection being edited in the state
   *
   * @param {Immutable.Map} collection - The collection being edited
   */
  setCollectionBeingEdited(collection) {
    return {
      type: CollectionActionTypes.SET_COLLECTION_BEING_EDITED,
      data: {collection}
    };
  },


  /**
   * Sends an API call to update the collection passed in
   *
   * @param  {String} collectionId   - The `_id` of the collection we're updating
   * @param  {Object} collectionData - The new collection data
   * @return {Function}            - The thunk that makes the API call
   */
  updateCollection(collectionId, collectionData) {
    return (dispatch) => {
      http.post(endpoints.collections.update.path, {collectionId, collectionData})
        .then(({collection}) => {
          // Reset the `collection` being edited after we've updated it
          dispatch(this.updateCollectionSuccess(collection));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  },

  /**
   * Manually sets the collection that's being viewed without calling the API
   * @param {Object} collection - The data passed to the Collection Reducer
   */
  setCollectionBeingViewed(collection) {
    return {
      type: CollectionActionTypes.SET_COLLECTION_BEING_VIEWED,
      data: {collection}
    };
  },


  /**
   * Handles the success return of the collection update
   *
   * @param  {Object} collection - The collection that was just updated
   * @return {Object}            - The data passed to the Collection Reducer
   */
  updateCollectionSuccess(collection) {
    return {
      type: CollectionActionTypes.UPDATE_COLLECTION_SUCCESS,
      data: {collection}
    };
  }

};

export default CollectionActionCreators;