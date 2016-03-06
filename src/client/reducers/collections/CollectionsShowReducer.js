import {
  FETCH_COLLECTION_BEING_VIEWED_SUCCESS,
  SET_COLLECTION_BEING_VIEWED,
  RESET_COLLECTION_BEING_VIEWED} from '../.././action_types/CollectionActionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  collection: null
});

export default function CollectionsShowReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_COLLECTION_BEING_VIEWED_SUCCESS:
      return state.set('collection', Immutable.fromJS(action.data.collection));

    case SET_COLLECTION_BEING_VIEWED:
      return state.set('collection', Immutable.fromJS(action.data.collection));

    case RESET_COLLECTION_BEING_VIEWED:
      return state.set('collection', null);

    default:
      return state;

  }
};