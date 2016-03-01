import apiEndpoints from '.././apiEndpoints';
import {sendAjaxRequest} from '.././utils/ApiCaller';
import {createFlashMessage} from './AppActionCreators';
import CollectionActionTypes from './../action_types/CollectionActionTypes';

const CollectionActionCreators = {

  /**
   * Sends the AJAX request to create a collection on the server
   *
   * @param  {Immutable.Map} collection - The map containing the collection details
   * @return {Function}                 - The thunk that makes the API call
   */
  createCollection(collection) {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.collections.create.method,
        url: apiEndpoints.collections.create.path
      })
        .then((response) => {
          dispatch(this.createCollectionSuccess(response.data.collection));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
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
   * @param  {String} templateId - The `_id` of the template to delete
   * @return {Function}  - The thunk that makes the API call
   */
  deleteCollection(collectionId) {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.collections.delete.method,
        url: apiEndpoints.collections.delete.path,
        data: {collectionId}
      })
        .then(() => dispatch(this.deleteCollectionSuccess(collectionId)))
        .catch((response) => dispatch(createFlashMessage('red', response.data.message)));
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
      const endpoint = apiEndpoints.collections.show(id);
      sendAjaxRequest({
        method: endpoint.method,
        url: endpoint.path
      })
        .then((response) => dispatch(this.fetchCollectionBeingViewedSuccess(response.data.collection)))
        .catch((response) => {
          if (response.status === 500) {
            dispatch(createFlashMessage('red', 'Sorry, we\'re having a connection error... Maybe try again?'));
          }
          dispatch(createFlashMessage('red', response.data.message));
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
      sendAjaxRequest({
        method: apiEndpoints.collections.index.method,
        url: apiEndpoints.collections.index.path
      })
        .then((response) => {
          dispatch(this.fetchCollectionsSuccess(response.data.collections));
        })
        .catch((response) => {
          if (response.status === 500) {
            dispatch(createFlashMessage('red', 'Sorry, we\'re having a connection error... Maybe try again?'));
          }
          dispatch(createFlashMessage('red', response.data.message));
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
      sendAjaxRequest({
        method: apiEndpoints.collections.update.method,
        url: apiEndpoints.collections.update.path,
        data: {collectionId, collectionData}
      })
        .then((response) => {
          dispatch(this.updateCollectionSuccess(response.data.collection));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    }
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

}

export default CollectionActionCreators;