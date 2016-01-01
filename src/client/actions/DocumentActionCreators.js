// import apiEndpoints from '.././apiEndpoints';
// import {sendAjaxRequest} from '.././utils/ApiCaller';
// import {createFlashMessage} from './AppActionCreators';
// import DocumentActionTypes from './../action_types/DocumentActionTypes';

// const DocumentActionCreators = {


//   /**
//    * Handles the collections returned from the collections fetch
//    *
//    * @param  {Array} collections - The current user's collections
//    * @return {Object}            - The data passed to the Collection Reducer
//    */
//   fetchCollectionsSuccess(collections) {
//     return {
//       type: DocumentActionTypes.FETCH_COLLECTIONS_SUCCESS,
//       data: {collections}
//     };
//   },


//   /**
//    * Resets the flag for fetching collections
//    *
//    * @return {Object} - The data passed to the Template Reducer
//    */
//   resetShouldFetchCollections() {
//     return {type: DocumentActionTypes.RESET_SHOULD_FETCH_COLLECTIONS};
//   },


//   /**
//    * Resets the template being edited to no collection.
//    *
//    * @return {Object} - The data passed to the Collection Reducer
//    */
//   resetCollectionBeingEdited() {
//     return {type: DocumentActionTypes.RESET_COLLECTION_BEING_EDITED};
//   },


//   /**
//    * Sets the current collection being edited in the state
//    *
//    * @param {Immutable.Map} collection - The collection being edited
//    */
//   setCollectionBeingEdited(collection) {
//     return {
//       type: DocumentActionTypes.SET_COLLECTION_BEING_EDITED,
//       data: {collection}
//     };
//   },


//   /**
//    * Sends an API call to update the collection passed in
//    *
//    * @param  {String} collectionId   - The `_id` of the collection we're updating
//    * @param  {Object} collectionData - The new collection data
//    * @return {Function}            - The thunk that makes the API call
//    */
//   updateCollection(collectionId, collectionData) {
//     return (dispatch) => {
//       sendAjaxRequest({
//         method: apiEndpoints.collections.update.method,
//         url: apiEndpoints.collections.update.path,
//         data: {collectionId, collectionData}
//       })
//         .then((response) => {
//           dispatch(this.updateCollectionSuccess(response.data.collection));
//         })
//         .catch((response) => {
//           dispatch(createFlashMessage('red', response.data.message));
//         });
//     }
//   },


//   /**
//    * Handles the success return of the collection update
//    *
//    * @param  {Object} collection - The collection that was just updated
//    * @return {Object}            - The data passed to the Collection Reducer
//    */
//   updateCollectionSuccess(collection) {
//     return {
//       type: DocumentActionTypes.UPDATE_COLLECTION_SUCCESS,
//       data: {collection}
//     };
//   }

// }

// export default DocumentActionCreators;