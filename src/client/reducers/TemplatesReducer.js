import Immutable from 'immutable';
import TemplateActionTypes from '.././action_types/TemplateActionTypes';

const initialState = Immutable.fromJS({
  shouldFetchTemplates: true,
  templates: []
});

export default function templatesReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {
    case TemplateActionTypes.CREATE_TEMPLATE_SUCCESS:
      // Makes sure we refetch the templates to include our newly created one.
      state = state.set('shouldFetchTemplates', true);

    case TemplateActionTypes.FETCH_TEMPLATES_SUCCESS:
      return state.merge({
        shouldFetchTemplates: false,
        templates: action.data.templates
      });

    default:
      return state;
  }

}