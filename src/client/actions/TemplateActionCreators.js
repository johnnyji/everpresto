import ApiCaller from '.././utils/ApiCaller';
import apiEndpoints from '.././apiEndpoints';
import TemplateActionTypes from './../action_types/TemplateActionTypes';

const TemplateActionCreators = {

  /**
   * Sends the AJAX request to create the template on the server
   *
   * @param  {Immutable.Map} template - The map containing the template details
   * @return {Function}               - The function that makes the async call
   */
  createTemplate(template) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.templates.create.method,
        url: apiEndpoints.templates.create.path,
        data: {template}
      })
        .then((response) => {
          debugger;
        })
        .catch((response) => {
          debugger;
        });
    };
  }

}

export default TemplateActionCreators;