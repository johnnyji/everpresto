import {
  ADD_PLACEHOLDER,
  FETCH_TEMPLATE_BEING_EDITED,
  FETCH_TEMPLATE_BEING_EDITED_ERROR,
  FETCH_TEMPLATE_BEING_EDITED_SUCCESS,
  RESET_TEMPLATE_BEING_EDITED,
  SET_TEMPLATE_BEING_EDITED,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_ERROR,
  UPDATE_TEMPLATE_SUCCESS
} from './ActionTypes';
import http, {endpoints} from '../../../utils/http';
import {createFlashMessage} from '../../../actions/AppActionCreators';

export default {

  addPlaceholder() {
    return {
      type: ADD_PLACEHOLDER
    };
  },

  fetch(id) {
    return (dispatch) => {
      dispatch({type: FETCH_TEMPLATE_BEING_EDITED});

      http.get(endpoints.templates.show(id).path)
        .then(({template}) => {
          dispatch({
            type: FETCH_TEMPLATE_BEING_EDITED_SUCCESS,
            data: {template}
          });
        })
        .catch(({message}) => {
          dispatch({
            type: FETCH_TEMPLATE_BEING_EDITED_ERROR,
            data: {error: message}
          });
        });
    };
  },

  /**
   * Resets the template being edited to no template.
   * @return {Object} - The data passed to the Template Reducer
   */
  reset() {
    return {
      type: RESET_TEMPLATE_BEING_EDITED
    };
  },

  /**
   * Sets the current template being edited in the state
   * @param {Immutable.Map} template - The template being edited
   */
  setTemplateBeingEdited(template) {
    return {
      type: SET_TEMPLATE_BEING_EDITED,
      data: {template}
    };
  },


  /**
   * Sends an API call to update the template passed in
   * @param  {String} templateId   - The `_id` of the template we're updating
   * @param  {Object} templateData - The new template data
   * @return {Function}            - The thunk that makes the API call
   */
  update(templateId, templateData) {
    return (dispatch) => {
      // Beginning the update procedure
      dispatch({type: UPDATE_TEMPLATE});

      http.post(endpoints.templates.update.path, {templateId, templateData})
        .then(({template}) => {
          debugger;
          // Dispatches the updated template
          dispatch({
            type: UPDATE_TEMPLATE_SUCCESS,
            data: {template}
          });
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
          dispatch({type: UPDATE_TEMPLATE_ERROR});
        });
    };
  }

};
