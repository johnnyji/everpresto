import Immutable from 'immutable';
import TemplateActionTypes from '.././action_types/TemplateActionTypes';

const initialState = Immutable.fromJS({
  templates: [],
  wasEverFetched: false
});

export default function templatesReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {

    case TemplateActionTypes.CREATE_TEMPLATE_SUCCESS:
      // Adds a template to the current list of templates
      return state.update('templates', (templates) => {
        return templates.push(Immutable.fromJS(action.data.template));
      });

    default:
      return state;
  }
}