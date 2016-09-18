import {
  DELETE_TEMPLATE_SUCCESS,
  FETCH_TEMPLATES_ERROR,
  FETCH_TEMPLATES_PENDING,
  FETCH_TEMPLATES_SUCCESS,
  RESET_TEMPLATE_CREATED
} from '../actions/ActionTypes';
import createReducer from 'create-reducer-redux';
import {fromJS} from 'immutable';

const initialState = fromJS({
  fetched: false,
  fetchError: null,
  fetching: false,
  templates: []
});

export default createReducer(initialState, {

  name: 'TemplatesIndexReducer',

  handlers: {
    onDelete: [DELETE_TEMPLATE_SUCCESS],
    onFetchError: [FETCH_TEMPLATES_ERROR],
    onFetched: [FETCH_TEMPLATES_SUCCESS],
    onFetching: [FETCH_TEMPLATES_PENDING],
    resetTemplateCreated: [RESET_TEMPLATE_CREATED]
  },

  onDelete(state, {deletedTemplateId}) {
    const index = state.get('templates').findIndex((t) => t.get('id') === deletedTemplateId);
    return state.update('templates', (templates) => templates.delete(index));
  },

  onFetchError(state, {error}) {
    return state.merge({
      fetchError: error,
      fetched: true,
      fetching: false
    });
  },

  onFetched(state, {templates}) {
    return state.merge({
      fetchError: null,
      fetched: true,
      fetching: false,
      templates
    });
  },

  onFetching(state) {
    return state.merge({
      fetchError: null,
      fetched: false,
      fetching: true
    });
  }

});
