import DocumentNewActionTypes from './../action_types/DocumentNewActionTypes';
import apiEndpoints from '.././apiEndpoints';
import {sendAjaxRequest} from '.././utils/ApiCaller';
import {createFlashMessage} from './AppActionCreators';
import {setCollectionBeingViewed} from './CollectionActionCreators';

const DocumentNewActionCreators = {

  addSigner(signer) {
    return {
      type: DocumentNewActionTypes.ADD_SIGNER,
      data: {signer}
    };
  },

  addMultipleSigners(signers) {
    return {
      type: DocumentNewActionTypes.ADD_MULTIPLE_SIGNERS,
      data: {signers}
    };
  },

  createDocuments(docs) {
    return (dispatch) => {
      sendAjaxRequest({
        url: apiEndpoints.documents.create.path,
        method: apiEndpoints.documents.create.method,
        data: {docs}
      })
        .then((response) => {
          // We need to refetch the collectionBeingViewed so it will contain all the documents
          // we've just created
          dispatch(setCollectionBeingViewed(response.data.collection));
          dispatch(this.createDocumentsSuccess());
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message))
        });
    };
  },

  createDocumentsSuccess(docs) {
    return {
      type: DocumentNewActionTypes.CREATE_DOCUMENTS_SUCCESS,
      data: {docs}
    };
  },

  generateGeneralPlaceholderFormFields() {
    return {
      type: DocumentNewActionTypes.GENERATE_GENERAL_PLACEHOLDER_FORM_FIELDS
    };
  },

  removeSigner(signer) {
    return {
      type: DocumentNewActionTypes.REMOVE_SIGNER,
      data: {signer}
    };
  },

  resetState() {
    return {
      type: DocumentNewActionTypes.RESET_STATE
    };
  },

  setCollection(collectionId) {
    return {
      type: DocumentNewActionTypes.SET_COLLECTION,
      data: {collectionId}
    };
  },

  setTemplate(template) {
    return {
      type: DocumentNewActionTypes.SET_TEMPLATE,
      data: {template}
    };
  },

  updateGeneralPlaceholderFormField(input) {
    return {
      type: DocumentNewActionTypes.UPDATE_GENERAL_PLACEHOLDER_FORM_FIELD,
      data: {input}
    };
  }

}

export default DocumentNewActionCreators;