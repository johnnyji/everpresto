import Immutable from 'immutable';
import DocumentNewActionTypes from '.././action_types/DocumentNewActionTypes';

const {
  SET_COLLECTION,
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

    case SET_COLLECTION:
      return state.setIn(['doc', 'collectionId'], action.data.collectionId);

    case SET_TEMPLATE:
      return state.setIn(['doc', 'template'], action.data.template);

    default:
      return state;
  }

}