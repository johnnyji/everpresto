import DocumentNewActionTypes from './../action_types/DocumentNewActionTypes';

const DocumentNewActionCreators = {

  addSigner(signer) {
    return {
      type: DocumentNewActionTypes.ADD_SIGNER,
      data: {signer}
    }
  },

  addMultipleSigners(signers) {
    return {
      type: DocumentNewActionTypes.ADD_MULTIPLE_SIGNERS,
      data: {signers}
    }
  },

  removeSigner(signer) {
    return {
      type: DocumentNewActionTypes.REMOVE_SIGNER,
      data: {signer}
    }
  },

  resetDocument() {
    return {
      type: DocumentNewActionTypes.RESET_DOCUMENT
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
  }

}

export default DocumentNewActionCreators;