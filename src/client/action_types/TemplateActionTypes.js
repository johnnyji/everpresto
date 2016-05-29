import createConstants from './utils/createConstants';

const TemplateActionTypes = createConstants([
  'DELETE_TEMPLATE_SUCCESS',
  'FETCH_TEMPLATES_SUCCESS',
  'FETCH_TEMPLATES_SUCCESS',
  'RESET_TEMPLATE_BEING_EDITED',
  'RESET_TEMPLATE_CREATED',
  'SET_TEMPLATE_BEING_EDITED',
  'UPDATE_TEMPLATE_SUCCESS'
]);

export default TemplateActionTypes;
