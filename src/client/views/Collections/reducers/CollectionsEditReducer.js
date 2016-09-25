import {
  CREATE_COLLECTION_SUCCESS,
  SET_COLLECTION_BEING_EDITED,
  RESET_COLLECTION_BEING_EDITED,
  UPDATE_COLLECTION_SUCCESS
} from '../actions/action_types/CollectionActionTypes';
import createReducer from 'create-reducer-redux';
import {fromJS} from 'immutable';

const initialState = fromJS({
  collection: null
});

export default createReducer(initialState, {

  name: 'CollectionsEditReducer',

  handlers: {
    onSet: [
      CREATE_COLLECTION_SUCCESS,
      SET_COLLECTION_BEING_EDITED
    ],
    onReset: [
      RESET_COLLECTION_BEING_EDITED,
      UPDATE_COLLECTION_SUCCESS
    ]
  },

  onSet(state, {collection}) {
    return state.merge({collection});
  },

  onReset(state) {
    return state.set('collection', null);
  }

});
