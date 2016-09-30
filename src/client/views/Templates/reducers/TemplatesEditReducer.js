import {
  CREATE_TEMPLATE_SUCCESS,
  FETCH_TEMPLATE_BEING_EDITED,
  FETCH_TEMPLATE_BEING_EDITED_ERROR,
  FETCH_TEMPLATE_BEING_EDITED_SUCCESS,
  RESET_TEMPLATE_BEING_EDITED,
  SET_TEMPLATE_BEING_EDITED,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_ERROR,
  UPDATE_TEMPLATE_SUCCESS
} from '../actions/ActionTypes';
import {fromJS, is} from 'immutable';

const initState = fromJS({
  template: null,
  fetching: false,
  fetched: false,
  fetchError: null,
  saving: false,
  saved: false
});

const onSetTemplate = (state, {template}) => {
  // No need to convert to Immutable.js, the template being passed in is already
  // and Immutable.Map
  const templateBeingEdited = is(template) ? template : fromJS(template);
  return state.set('template', templateBeingEdited);
};

const onSaving = (state) => {
  return state.merge({
    saved: false,
    saving: true
  });
};

const onSaved = (state) => {
  return state.merge({
    saved: true,
    saving: false
  });
};

const onSaveError = (state) => {
  return state.merge({
    saved: false,
    saving: false
  });
};

export default (state = initState, {type, data}) => {
  switch (type) {

    case RESET_TEMPLATE_BEING_EDITED:
      return initState;

    case FETCH_TEMPLATE_BEING_EDITED:
      return state.merge({
        fetchError: null,
        fetching: true,
        fetched: false,
        template: null
      });

    case FETCH_TEMPLATE_BEING_EDITED_ERROR:
      return state.merge({
        fetchError: data.error,
        fetching: false,
        fetched: true,
        template: null
      });

    case FETCH_TEMPLATE_BEING_EDITED_SUCCESS:
      return state.merge({
        fetchError: null,
        fetching: false,
        fetched: true,
        template: data.template
      });

    case UPDATE_TEMPLATE:
      return onSaving(state);

    case UPDATE_TEMPLATE_ERROR:
      return onSaveError(state, data);

    case UPDATE_TEMPLATE_SUCCESS:
      return onSaved(state);
    
    case CREATE_TEMPLATE_SUCCESS:
    case SET_TEMPLATE_BEING_EDITED:
      return onSetTemplate(state, data);
    
    default: {
      return state;
    }

  }
};
