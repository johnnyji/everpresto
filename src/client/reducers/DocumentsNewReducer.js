import Immutable from 'immutable';
import DocumentNewActionTypes from '.././action_types/DocumentNewActionTypes';

const {
  RESET_DOCUMENT,
  SET_COLLECTION,
  SET_TEMPLATE} = DocumentNewActionTypes;

const initialDocState = {
  collectionId: null,
  signers: [],
  template: null
};

const initialState = Immutable.fromJS({doc: initialDocState});

export default function documentsReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {

    case RESET_DOCUMENT:
      return state.set('doc', Immutable.fromJS(initialDocState));

    case SET_COLLECTION:
      return state.setIn(['doc', 'collectionId'], action.data.collectionId);

    case SET_TEMPLATE:
      // `template` will already be an Immutable.Map
      return state.setIn(['doc', 'template'], action.data.template);

    default:
      return state;
  }

}