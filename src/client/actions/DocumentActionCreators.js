import {createFlashMessage} from './AppActionCreators';
import DocumentActionTypes from './../action_types/DocumentActionTypes';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const DocumentActionCreators = {

  /**
   * Fetches the current company's documents from the API
   * @return {Function} - The thunk that performs the API call
   */
  fetchDocs() {
    return (dispatch) => {
      http.get(endpoints.documents.index.path)
        .then(({docs}) => {
          dispatch(this.fetchDocsSuccess(docs));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  /**
   * Handles the documents returned from the documents fetch
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
   * @return {Object} - The data passed to the Template Reducer
   */
  resetShouldFetchDocs() {
    return {type: DocumentActionTypes.RESET_SHOULD_FETCH_DOCUMENTS};
  }

};

export default DocumentActionCreators;