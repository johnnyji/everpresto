import {
  FETCH_TEMPLATES,
  FETCH_TEMPLATES_ERROR,
  FETCH_TEMPLATES_SUCCESS
} from '.././action_types/TemplateActionTypes';
import createReducer from 'create-reducer-redux';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  fetched: false,
  fetchError: null,
  fetching: false
});

export default createReducer(initialState, {

  name: 'TemplatesFetchingReducer',

  handlers: {
    onFetched: [FETCH_TEMPLATES_SUCCESS],
    onFetchError: [FETCH_TEMPLATES_ERROR],
    onFetching: [FETCH_TEMPLATES]
  },

  onFetched(state) {
    return state.merge({
      fetched: true,
      fetchError: null,
      fetching: false
    });
  },

  onFetchError(state, {err}) {
    return state.merge({
      fetched: true,
      fetchError: err,
      fetching: false
    });
  },

  onFetching(state) {
    return state.merge({
      fetched: false,
      fetchError: null,
      fetching: true
    });
  }

});
