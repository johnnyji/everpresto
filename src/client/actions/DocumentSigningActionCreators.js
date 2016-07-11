import DocumentSigningActionTypes from '../action_types/DocumentSigningActionTypes';
import endpoints from '../utils/http/endpoints';
import {get} from '../utils/http';
// The action creator responsible for the document signature link
const DocumentSigningActionCreators = {

  fetchDocument(id, signatureToken) {
    const {path} = endpoints.documentSigning.signatureLink(id, signatureToken);

    return (dispatch) => {
      dispatch(DocumentSigningActionCreators.fetchDocumentPending());
      
      get(path)
        .then(({doc}) => {
          dispatch(DocumentSigningActionCreators.fetchDocumentSuccess(doc));
        })
        .catch(({message}) => {
          dispatch(DocumentSigningActionCreators.fetchDocumentError(message));
        });
    };
  },

  fetchDocumentPending() {
    return {
      type: DocumentSigningActionTypes.FETCH_DOCUMENT
    };
  },

  fetchDocumentError(error) {
    return {
      type: DocumentSigningActionTypes.FETCH_DOCUMENT_ERROR,
      data: {error}
    };
  },

  fetchDocumentSuccess(document) {
    return {
      type: DocumentSigningActionTypes.FETCH_DOCUMENT_SUCCESS,
      data: {document}
    };
  }

};

export default DocumentSigningActionCreators;
