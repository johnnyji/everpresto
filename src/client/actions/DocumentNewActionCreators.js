import DocumentNewActionTypes from './../action_types/DocumentNewActionTypes';

const DocumentNewActionCreators = {

  setCollection(collectionId) {
    return {
      type: DocumentNewActionTypes.SET_COLLECTION,
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