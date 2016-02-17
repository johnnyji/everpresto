import Immutable from 'immutable';
import DocumentNewActionTypes from '.././action_types/DocumentNewActionTypes';

const {
  ADD_SIGNER,
  ADD_MULTIPLE_SIGNERS,
  REMOVE_SIGNER,
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

    case ADD_SIGNER:
      // `signer` will already be Immutable
      return state.updateIn(['doc', 'signers'], (signers) => (
        signers.push(action.data.signer)
      ));

    case ADD_MULTIPLE_SIGNERS:
      return state.updateIn(['doc', 'signers'], (signers) => (
        signers.concat(Immutable.fromJS(action.data.signers))
      ));

    case REMOVE_SIGNER:
      // `signer` will already be Immutable
      return state.updateIn(['doc', 'signers'], (signers) => (
        signers.delete(
          signers.findIndex((signer) => signer.equals(action.data.signer))
        )
      ));

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