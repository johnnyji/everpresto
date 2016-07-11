import {
  FETCH_DOCUMENT,
  FETCH_DOCUMENT_ERROR,
  FETCH_DOCUMENT_SUCCESS
} from '../action_types/DocumentSigningActionTypes';
import createReducer from 'create-reducer-redux';
import Immutable from 'immutable';

const INITIAL_STATE = Immutable.fromJS({
  fetch: {
    fetchError: null,
    fetched: false,
    fetching: false
  },
  document: null
});

export default createReducer(INITIAL_STATE, {
  name: 'DocumentSigningReducer',

  handlers: {
    onFetchDocumentError: [FETCH_DOCUMENT_ERROR],
    onFetchedDocument: [FETCH_DOCUMENT_SUCCESS],
    onFetchingDocument: [FETCH_DOCUMENT]
  },

  onFetchDocumentError(state, {error}) {
    return state.merge({
      fetch: {
        fetchError: error,
        fetched: true,
        fetching: false
      }
    });
  },

  onFetchingDocument(state) {
    return state.merge({
      fetch: {
        fetchError: null,
        fetched: false,
        fetching: true
      }
    });
  },

  onFetchedDocument(state, {document}) {
    return state.merge({
      fetch: {
        fetchError: null,
        fetched: true,
        fetching: false
      },
      document
    });
  }

});
