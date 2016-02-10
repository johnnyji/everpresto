import Immutable from 'immutable';
import DocumentDraftActionTypes from '.././action_types/DocumentDraftActionTypes';

const {
  FETCH_DOCUMENTS_SUCCESS,
  RESET_SHOULD_FETCH_DOCUMENTS} = DocumentDraftActionTypes;

const initialState = Immutable.fromJS({
  draft: {
    recepients: []
  },
});

export default function documentsReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {

    case CREATE_DRAFT_SUCCESS:
      return state.merge({draft: action.data.draft});

    case UPDATE_MAPPINGS_SUCCESS:
      return state.setIn(['draft', 'mappings'], Immutable.fromJS(action.data.mappings));

    default:
      return state;
  }

}