import DocumentSigningActionTypes from '../action_types/DocumentSigningActionTypes';
import endpoints from '../utils/http/endpoints';
import {get} from '../utils/http';
// The action creator responsible for the document signature link
const DocumentSigningActionCreators = {

  fetchDocument(id, signatureLink) {
    const {path} = endpoints.documents.signatureLink(id, signatureLink);

    return (dispatch) => {
      get(path)
        .then((response) => {
          debugger;
          dispatch(DocumentSigningActionCreators.fetchDocumentSuccess(response.data.document));
        })
        .catch((response) => {
          debugger;
          dispatch(DocumentSigningActionCreators.fetchDocumentError(response.data.error));
        });
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
