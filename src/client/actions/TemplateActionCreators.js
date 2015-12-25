import apiEndpoints from '.././apiEndpoints';
import ApiCaller from '.././utils/ApiCaller';
import AppActionCreators from './AppActionCreators';
import TemplateActionTypes from './../action_types/TemplateActionTypes';

const TemplateActionCreators = {

  /**
   * Sends the AJAX request to create the template on the server
   *
   * @param  {Immutable.Map} template - The map containing the template details
   * @return {Function}               - The thunk that makes the API call
   */
  createTemplate(template) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.templates.create.method,
        url: apiEndpoints.templates.create.path,
        data: {template}
      })
        .then(() => {
          dispatch(this.createTemplateSuccess());
        })
        .catch((response) => {
          dispatch(AppActionCreators.createFlashMessage('red', response.message));
        });
    };
  },


  /**
   * Handles the successful return of a new template write
   *
   * @param  {Object} template - The action type being emitted
   * @return {Object}          - The data passed to the Template Reducer
   */
  createTemplateSuccess(template) {
    return {type: TemplateActionTypes.CREATE_TEMPLATE_SUCCESS};
  },


  /**
   * Fetches the templates for the current user
   *
   * @return {Function} - The thunk that makes the API call
   */
  fetchTemplates() {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.templates.index.method,
        url: apiEndpoints.templates.index.path
      })
        .then((response) => {
          dispatch(this.fetchTemplatesSuccess(response.data.templates));
        })
        .catch((response) => {
          dispatch(AppActionCreators.createFlashMessage('red', response.message));
        });
    };
  },


  /**
   * Handles the templates returned from the templates fetch
   *
   * @param  {Array} templates - The current user's templates
   * @return {Object}          - The data passed to the Template Reducer
   */
  fetchTemplatesSuccess(templates) {
    return {
      type: TemplateActionTypes.FETCH_TEMPLATES_SUCCESS,
      data: {templates}
    };
  }

}

export default TemplateActionCreators;