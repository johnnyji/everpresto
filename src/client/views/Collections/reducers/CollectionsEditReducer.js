import {
  CREATE_COLLECTION_SUCCESS,
  SET_COLLECTION_BEING_EDITED,
  RESET_COLLECTION_BEING_EDITED,
  UPDATE_COLLECTION_SUCCESS} from '../.././action_types/CollectionActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  collection: null
});

export default function CollectionsEditReducer(state = initialState, action) {
  switch (action.type) {

    case CREATE_COLLECTION_SUCCESS:
      // We want to set the collection as the one being edited right away
      // so they can change the name of the folder immediately after creating it
      return state.set('collection', Immutable.fromJS(action.data.collection));

    case SET_COLLECTION_BEING_EDITED:
      // No need to convert to Immutable.Map, because it already is.
      return state.set('collection', action.data.collection);

    case RESET_COLLECTION_BEING_EDITED:
      return state.set('collection', null);

    case UPDATE_COLLECTION_SUCCESS:
      // Once we've succesfully updated the collection we were editing, we are safe
      // to reset the state
      return state.set('collection', null);

    default:
      return state;

  }
}
