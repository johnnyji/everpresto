import {createConstants} from 'create-reducer-redux';

const DocumentSigningActionTypes = createConstants([
  'FETCH_DOCUMENT',
  'FETCH_DOCUMENT_ERROR',
  'FETCH_DOCUMENT_SUCCESS'
]);

export default DocumentSigningActionTypes;
