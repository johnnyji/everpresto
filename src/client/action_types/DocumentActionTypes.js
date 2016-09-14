import {createConstants} from 'create-reducer-redux';

const DocumentActionTypes = createConstants([
  'FETCH_DOCUMENTS_ERROR',
  'FETCH_DOCUMENTS_SUCCESS',
  'RESET_SHOULD_FETCH_DOCUMENTS'
]);

export default DocumentActionTypes;
