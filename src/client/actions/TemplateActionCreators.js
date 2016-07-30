/* eslint-disable no-console */
import {createFlashMessage} from './AppActionCreators';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';
import TemplateActionTypes from '../action_types/TemplateActionTypes';

const TemplateActionCreators = {

  addPlaceholder() {
    return {
      type: TemplateActionTypes.ADD_PLACEHOLDER
    };
  },

  /**
   * Sends the AJAX request to create the template on the server
   * @return {Function} - The thunk that makes the API call
   */
  createTemplate() {
    return (dispatch) => {
      http.post(endpoints.templates.create.path)
        .then(({template}) => {
          dispatch(this.createTemplateSuccess(template));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  /**
   * Handles the successful return of a new template write
   * @return {Object} - The data passed to the Template Reducer
   */
  createTemplateSuccess(template) {
    return {
      type: TemplateActionTypes.CREATE_TEMPLATE_SUCCESS,
      data: {template}
    };
  },

  /**
   * Executes the API call to delete a template
   * @param  {String} templateId - The `_id` of the template to delete
   * @return {Function}  - The thunk that makes the API call
   */
  deleteTemplate(templateId) {
    const {path} = endpoints.templates.delete(templateId);

    return (dispatch) => {
      http.delete(path)
        .then(({id}) => {
          dispatch(this.deleteTemplateSuccess(id));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  /**
   * Handles the success of the delete template
   * @param  {String} deletedTemplateId - The `_id` of the recently deleted template
   * @return {Object} - The data passed to the Template Reducer
   */
  deleteTemplateSuccess(deletedTemplateId) {
    return {
      type: TemplateActionTypes.DELETE_TEMPLATE_SUCCESS,
      data: {deletedTemplateId}
    };
  },

  /**
   * Fetches the templates for the current user
   * @return {Function} - The thunk that makes the API call
   */
  fetchTemplates() {
    return (dispatch) => {
      // Begin fetch
      dispatch(this.fetchTemplatesPending());

      http.get(endpoints.templates.index.path)
        .then(({templates}) => {
          dispatch(this.fetchTemplatesSuccess(templates));
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  fetchTemplatesPending() {
    return {
      type: TemplateActionTypes.FETCH_TEMPLATES
    };
  },

  // TODO: Refactor into `TemplateEditing` into its own reducer
  // and action creator
  fetchTemplateById(id, success) {
    return (dispatch) => {
      const {path} = endpoints.templates.show(id);

      http.get(path)
        .then(({template}) => {
          dispatch(success(template));
        })
        .catch(() => {
          dispatch(createFlashMessage('red', 'Oops! We couldn\'t find the template you were looking for!'));
        });
    };
  },

  /**
   * Handles the templates returned from the templates fetch
   * @param  {Array} templates - The current user's templates
   * @return {Object} - The data passed to the Template Reducer
   */
  fetchTemplatesSuccess(templates) {
    return {
      type: TemplateActionTypes.FETCH_TEMPLATES_SUCCESS,
      data: {templates}
    };
  },

  /**
   * Resets the flag for a template being just created to false.
   * @return {Object} - The data passed to the Template Reducer
   */
  resetTemplateCreated() {
    return {type: TemplateActionTypes.RESET_TEMPLATE_CREATED};
  },

  /**
   * Resets the template being edited to no template.
   * @return {Object} - The data passed to the Template Reducer
   */
  resetTemplateBeingEdited() {
    return {type: TemplateActionTypes.RESET_TEMPLATE_BEING_EDITED};
  },

  /**
   * Sets the current template being edited in the state
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
   * @param  {String} templateId   - The `_id` of the template we're updating
   * @param  {Object} templateData - The new template data
   * @return {Function}            - The thunk that makes the API call
   */
  updateTemplate(templateId, templateData) {
    return (dispatch) => {
      http.post(endpoints.templates.update.path, {templateId, templateData})
        .then(() => {
          dispatch(this.updateTemplateSuccess());
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  /**
   * Handles the success return of the template update
   * @return {Object} - The data passed to the Template Reducer
   */
  updateTemplateSuccess() {
    return {type: TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS};
  }

};

export default TemplateActionCreators;
/* eslint-disable no-console */