import DocumentNewActionTypes from './../action_types/DocumentNewActionTypes';

const DocumentNewActionCreators = {

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