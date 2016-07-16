import createReducer from 'create-reducer-redux';
import Immutable from 'immutable';
import TemplateActionTypes from '.././action_types/TemplateActionTypes';
import {matchesAttr} from '.././utils/immutable/IterableFunctions';

const matchesId = matchesAttr('_id');

const {
  CREATE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_SUCCESS,
  FETCH_TEMPLATES_SUCCESS,
  RESET_TEMPLATE_CREATED,
  RESET_TEMPLATE_BEING_EDITED,
  SET_TEMPLATE_BEING_EDITED,
  UPDATE_TEMPLATE_SUCCESS} = TemplateActionTypes;

const initialState = Immutable.fromJS({
  shouldFetchTemplates: true,
  templateBeingEdited: null,
  templateCreated: false,
  templates: []
});

export default createReducer(initialState, {

  name: 'TemplatesReducer',

  handlers: {
    onCreateTemplate: [CREATE_TEMPLATE_SUCCESS],
    onDeleteTemplate: [DELETE_TEMPLATE_SUCCESS],
    onFetchTemplates: [FETCH_TEMPLATES_SUCCESS],
    onUpdateTemplate: [UPDATE_TEMPLATE_SUCCESS],
    resetTemplateCreated: [RESET_TEMPLATE_CREATED],
    resetTemplateBeingEdited: [RESET_TEMPLATE_BEING_EDITED],
    setTemplateBeingEdited: [SET_TEMPLATE_BEING_EDITED]
  },

  onCreateTemplate(state, {template}) {
    // Make sure we set our template being edited to our just created one,
    // so we'll be able to edit and alter it right away
    return state.merge({
      templateBeingEdited: template,
      // Makes sure to refetch the templates to include the newly created one
      shouldFetchTemplates: true
    });
  },

  onDeleteTemplate(state, {deletedTemplateId}) {
    return state.update('templates', (templates) => {
      return templates.delete(
        templates.findIndex(matchesId(deletedTemplateId))
      );
    });
  },

  onFetchTemplates(state, {templates}) {
    return state.merge({
      shouldFetchTemplates: false,
      templates
    });
  },

  // TODO: Instead of refetching all the templates, get the returned template from the server
  // and just add it onto the list on the front-end
  onUpdateTemplate(state) {
    return state.merge({
      shouldFetchTemplates: true,
      templateBeingEdited: null
    });
  },

  resetTemplateCreated(state) {
    return state.set('templateCreated', false);
  },

  resetTemplateBeingEdited(state) {
    return state.set('templateBeingEdited', null);
  },

  setTemplateBeingEdited(state, {template}) {
    // No need to convert to Immutable.js, the template being passed in is already
    // and Immutable.Map
    const templateBeingEdited = Immutable.is(template) ? template : Immutable.fromJS(template);
    return state.set('templateBeingEdited', templateBeingEdited);
  }

});
