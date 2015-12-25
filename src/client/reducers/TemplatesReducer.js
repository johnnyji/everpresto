import Immutable from 'immutable';
import TemplateActionTypes from '.././action_types/TemplateActionTypes';

const {
  CREATE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_SUCCESS,
  FETCH_TEMPLATES_SUCCESS,
  RESET_TEMPLATE_CREATED} = TemplateActionTypes;

const initialState = Immutable.fromJS({
  shouldFetchTemplates: true,
  templateCreated: false,
  templates: []
});

export default function templatesReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {
    case CREATE_TEMPLATE_SUCCESS:
      // Makes sure we refetch the templates to include our newly created one.
      return state.merge({
        shouldFetchTemplates: true,
        templateCreated: true
      });

    case DELETE_TEMPLATE_SUCCESS:
      return state.update('templates', (templates) => {
        return templates.delete(
          templates.findIndex((template) => template.get('_id') === action.data.deletedTemplateId)
        );
      }); 

    case FETCH_TEMPLATES_SUCCESS:
      return state.merge({
        shouldFetchTemplates: false,
        templates: action.data.templates
      });

    case RESET_TEMPLATE_CREATED:
      return state.set('templateCreated', false);

    default:
      return state;
  }

}