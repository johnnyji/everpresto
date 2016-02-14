import DocumentNewActionTypes from './../action_types/DocumentNewActionTypes';

const DocumentNewActionCreators = {

  createNewDocument(collectionId) {
    return {
      type: DocumentNewActionTypes.CREATE_NEW_DOCUMENT,
      data: {collectionId}
    }
  },

  setTemplate(template) {
    return {
      type: DocumentNewActionTypes.SET_TEMPLATE,
      data: {template}
    }
  }

}

export default DocumentNewActionCreators;