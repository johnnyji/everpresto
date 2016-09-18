import {
  CREATE_TEMPLATE_SUCCESS,
  RESET_TEMPLATE_BEING_EDITED,
  SET_TEMPLATE_BEING_EDITED,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_ERROR,
  UPDATE_TEMPLATE_SUCCESS
} from '../actions/ActionTypes';
import {fromJS, is} from 'immutable';
import createReducer from 'create-reducer-redux';

const initState = fromJS({
  template: null,
  saving: false,
  saved: false
});

export default createReducer(initState, {

  name: 'TemplatesEditReducer',

  handlers: {
    onClear: [
      RESET_TEMPLATE_BEING_EDITED,
      UPDATE_TEMPLATE_SUCCESS
    ],
    onSaveError: [UPDATE_TEMPLATE_ERROR],
    onSaving: [UPDATE_TEMPLATE],
    onSetTemplate: [
      // When the user creates a template, we want to set it as the template being edited
      // so they can start to edit it right away
      CREATE_TEMPLATE_SUCCESS,
      SET_TEMPLATE_BEING_EDITED
    ]
  },

  onClear() {
    return initState;
  },

  onSaveError(state) {
    return state.merge({
      saved: false,
      saving: false
    });
  },

  onSaving(state) {
    return state.merge({
      saved: false,
      saving: true
    });
  },

  onSaved(state) {
    return state.merge({
      saved: true,
      saving: false
    });
  },

  onSetTemplate(state, {template}) {
    // No need to convert to Immutable.js, the template being passed in is already
    // and Immutable.Map
    const templateBeingEdited = is(template) ? template : fromJS(template);
    return state.set('template', templateBeingEdited);
  }

});
