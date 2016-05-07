import apiEndpoints from '.././apiEndpoints';
import {sendAjaxRequest} from '.././utils/ApiCaller';
import {createFlashMessage} from './AppActionCreators';
import DocumentActionTypes from './../action_types/DocumentActionTypes';

const DocumentActionCreators = {


  /**
   * Fetches the current company's documents from the API
   *
   * @return {Function} - The thunk that performs the API call
   */
  fetchDocs() {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.documents.index.method,
        url: apiEndpoints.documents.index.path
      })
        .then((response) => {
          dispatch(this.fetchDocsSuccess(response.data.docs));
        })
        .catch((response) => {
          // TODO: Move this out into utility for all API responses
          // Handles any code syntax errors
          if (!response.hasOwnProperty('data')) {
            // If the response is not triggered by the API, alert and log it.
            console.error(response);
            dispatch(createFlashMessage('red', response));  
          }
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  },

  /**
   * Handles the documents returned from the documents fetch
   *
   * @param  {Array} collections - The current company's documents
   * @return {Object}            - The data passed to the Document Reducer
   */
  fetchDocsSuccess(docs) {
    return {
      type: DocumentActionTypes.FETCH_DOCUMENTS_SUCCESS,
      data: {docs}
    };
  },


  /**
   * Resets the flag for fetching collections
   *
   * @return {Object} - The data passed to the Template Reducer
   */
  resetShouldFetchDocs() {
    return {type: DocumentActionTypes.RESET_SHOULD_FETCH_DOCUMENTS};
  }

};

export default DocumentActionCreators;
