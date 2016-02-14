import Immutable from 'immutable';
import DocumentNewActionTypes from '.././action_types/DocumentNewActionTypes';

const {
  CREATE_NEW_DOCUMENT,
  SET_TEMPLATE} = DocumentNewActionTypes;

const initialState = Immutable.fromJS({
  doc: {
    collectionId: null,
    signers: [],
    template: null
  }
});

export default function documentsReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {

    case CREATE_NEW_DOCUMENT:
      return state.setIn(['doc', 'collectionId'], action.data.collectionId);

    case SET_TEMPLATE:
      return state.setIn(['doc', 'template'], action.data.template);

    default:
      return state;
  }

}