import DocumentNewActionTypes from './../action_types/DocumentNewActionTypes';
import endpoints from '../utils/http/endpoints';
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

  addSigners(signers) {
    return {
      type: DocumentNewActionTypes.ADD_SIGNERS,
      data: {signers}
    };
  },

  clearSpecificPlaceholderForm() {
    return {
      type: DocumentNewActionTypes.CLEAR_SPECIFIC_PLACEHOLDER_FORM
    };
  },

  createDocuments(docs) {
    return (dispatch) => {
      dispatch(this.createDocumentsPending());

      sendAjaxRequest({
        url: endpoints.documents.create.path,
        method: endpoints.documents.create.method,
        data: {docs}
      })
        .then((response) => {
          // const successMsg = `${pluralize(docs.length, 'document', 'documents')} successfully created!`;
          // dispatch(createFlashMessage('green', successMsg));

          // We need to refetch the collectionBeingViewed so it will contain all the documents
          // we've just created
          dispatch(setCollectionBeingViewed(response.data.collection));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  },

  createDocumentsSuccess(docs) {
    return {
      type: DocumentNewActionTypes.CREATE_DOCUMENTS_SUCCESS,
      data: {docs}
    };
  },

  createDocumentsPending() {
    return {
      type: DocumentNewActionTypes.CREATE_DOCUMENTS
    };
  },

  generateGeneralPlaceholderFormFields() {
    return {
      type: DocumentNewActionTypes.GENERATE_GENERAL_PLACEHOLDER_FORM_FIELDS
    };
  },

  generateSpecificPlaceholderFormFields() {
    return {
      type: DocumentNewActionTypes.GENERATE_SPECIFIC_PLACEHOLDER_FORM_FIELDS
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

  setEmailsSentCount(count) {
    return {
      type: DocumentNewActionTypes.SET_EMAILS_SENT_COUNT,
      data: {count}
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
  },

  updateSpecificPlaceholderFormField(input) {
    return {
      type: DocumentNewActionTypes.UPDATE_SPECIFIC_PLACEHOLDER_FORM_FIELD,
      data: {input}
    };
  }

};

export default DocumentNewActionCreators;
