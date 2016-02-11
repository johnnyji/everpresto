import {sendAjaxRequest} from '.././utils/ApiCaller';
import apiEndpoints from '.././apiEndpoints';
import AppActionCreators from './AppActionCreators';
import TemplateActionTypes from './../action_types/TemplateActionTypes';

const {createFlashMessage} = AppActionCreators;

const TemplateActionCreators = {

  addPlaceholder() {
    return {type: TemplateActionTypes.ADD_PLACEHOLDER}
  },

  /**
   * Sends the AJAX request to create the template on the server
   *
   * @return {Function}               - The thunk that makes the API call
   */
  createTemplate() {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.templates.create.method,
        url: apiEndpoints.templates.create.path
      })
        .then((response) => dispatch(this.createTemplateSuccess(response.data.template)))
        .catch((response) => dispatch(createFlashMessage('red', response.data.message)));
    };
  },


  /**
   * Handles the successful return of a new template write
   *
   * @return {Object}          - The data passed to the Template Reducer
   */
  createTemplateSuccess(template) {
    return {
      type: TemplateActionTypes.CREATE_TEMPLATE_SUCCESS,
      data: {template}
    };
  },


  /**
   * Executes the API call to delete a template
   *
   * @param  {String} templateId - The `_id` of the template to delete
   * @return {Function}  - The thunk that makes the API call
   */
  deleteTemplate(templateId) {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.templates.delete.method,
        url: apiEndpoints.templates.delete.path,
        data: {templateId}
      })
        .then(() => {
          dispatch(this.deleteTemplateSuccess(templateId));
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  },


  /**
   * Handles the success of the delete template
   * @param  {String} deletedTemplateId - The `_id` of the recently deleted template
   * @return {Object}                   - The data passed to the Template Reducer
   */
  deleteTemplateSuccess(deletedTemplateId) {
    return {
      type: TemplateActionTypes.DELETE_TEMPLATE_SUCCESS,
      data: {deletedTemplateId}
    };
  },  


  /**
   * Fetches the templates for the current user
   *
   * @return {Function} - The thunk that makes the API call
   */
  fetchTemplates() {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.templates.index.method,
        url: apiEndpoints.templates.index.path
      })
        .then((response) => {
          dispatch(this.fetchTemplatesSuccess(response.data.templates));
        })
        .catch((response) => {
          if (response.status === 500) {
            dispatch(createFlashMessage('red', 'Sorry, we\'re having a connection error... Maybe try again?'));
          }
          dispatch(createFlashMessage('red', response.data.message));
        });
    };
  },


  /**
   * Fetches a template from the API using the `_id` attribute
   *
   * @param {String} id - The id of the template we're fetching
   * @param {Function} id - The action creator to invoke on success of the fetch
   */
  fetchTemplateById(id, success) {
    return (dispatch) => {
      const endpoint = apiEndpoints.templates.show(id);
      sendAjaxRequest({
        url: endpoint.path,
        method: endpoint.method
      })
        .then((response) => {
          dispatch(success(response.data.template))
        })
        .catch((response) => {
          console.log('err');
          dispatch(createFlashMessage('red', 'Oops! We couldn\'t find the template you were looking for!'))
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
  },


  /**
   * Resets the flag for a template being just created to false.
   *
   * @return {Object} - The data passed to the Template Reducer
   */
  resetTemplateCreated() {
    return {type: TemplateActionTypes.RESET_TEMPLATE_CREATED};
  },


  /**
   * Resets the template being edited to no template.
   *
   * @return {Object} - The data passed to the Template Reducer
   */
  resetTemplateBeingEdited() {
    return {type: TemplateActionTypes.RESET_TEMPLATE_BEING_EDITED};
  },


  /**
   * Sets the current template being edited in the state
   *
   * @param {Immutable.Map} template - The template being edited
   */
  setTemplateBeingEdited(template) {
    return {
      type: TemplateActionTypes.SET_TEMPLATE_BEING_EDITED,
      data: {template}
    };
  },


  /**
   * Sends an API call to update the template passed in
   *
   * @param  {String} templateId   - The `_id` of the template we're updating
   * @param  {Object} templateData - The new template data
   * @return {Function}            - The thunk that makes the API call
   */
  updateTemplate(templateId, templateData) {
    return (dispatch) => {
      sendAjaxRequest({
        method: apiEndpoints.templates.update.method,
        url: apiEndpoints.templates.update.path,
        data: {templateId, templateData}
      })
        .then(() => {
          dispatch(this.updateTemplateSuccess());
        })
        .catch((response) => {
          dispatch(createFlashMessage('red', response.data.message));
        });
    }
  },


  /**
   * Handles the success return of the template update
   * 
   * @return {Object} - The data passed to the Template Reducer
   */
  updateTemplateSuccess() {
    return {type: TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS};
  }

}

export default TemplateActionCreators;