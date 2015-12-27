import apiEndpoints from '.././apiEndpoints';
import ApiCaller from '.././utils/ApiCaller';
import AppActionCreators from './AppActionCreators';
import CollectionActionTypes from './../action_types/CollectionActionTypes';

const {createFlashMessage} = AppActionCreators;

const CollectionActionCreators = {

  /**
   * Sends the AJAX request to create a collection on the server
   *
   * @param  {Immutable.Map} collection - The map containing the collection details
   * @return {Function}                 - The thunk that makes the API call
   */
  createCollection(collection) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.collections.create.method,
        url: apiEndpoints.collections.create.path,
        data: {collection}
      })
        .then((response) => {
          dispatch(this.createCollectionSuccess(response.data.collection));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.message));
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
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.collections.delete.method,
        url: apiEndpoints.collections.delete.path,
        data: {collectionId}
      })
        .then(() => dispatch(this.deleteCollectionSuccess(collectionId)))
        .catch((response) => dispatch(createFlashMessage('red', response.message)));
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
   * Fetches the collections for the current user
   *
   * @return {Function} - The thunk that makes the API call
   */
  fetchCollections() {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
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
          dispatch(createFlashMessage('red', response.message));
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
   * Resets the template being edited to no template.
   *
   * @return {Object} - The data passed to the Template Reducer
   */
  resetTemplateBeingEdited() {
    return {type: CollectionActionTypes.RESET_COLLECTION_BEING_EDITED};
  },


  /**
   * Sets the current template being edited in the state
   *
   * @param {Immutable.Map} template - The template being edited
   */
  setTemplateBeingEdited(template) {
    return {
      type: CollectionActionTypes.SET_COLLECTION_BEING_EDITED,
      data: {template}
    };
  },


  /**
   * Sends an API call to update the template passed in
   *
   * @param  {String} templateId   - The `_id` of the template we're updating
   * @param  {Object} templateData - The new template data
   * @return {Function}            - The thunk that makes the API call
   */
  updateTemplate(templateId, templateData) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.templates.update.method,
        url: apiEndpoints.templates.update.path,
        data: {templateId, templateData}
      })
        .then(() => {
          dispatch(this.updateTemplateSuccess());
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.message));
        });
    }
  },


  /**
   * Handles the success return of the template update
   * 
   * @return {Object} - The data passed to the Template Reducer
   */
  updateTemplateSuccess() {
    return {type: CollectionActionTypes.UPDATE_COLLECTION_SUCCESS};
  }

}

export default CollectionActionCreators;