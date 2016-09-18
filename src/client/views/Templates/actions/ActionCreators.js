import {
  CREATE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_SUCCESS,
  FETCH_TEMPLATES,
  FETCH_TEMPLATES_ERROR,
  FETCH_TEMPLATES_SUCCESS
} from './ActionTypes';
import http, {endpoints} from '../../../utils/http';
import {createFlashMessage} from '../../../actions/AppActionCreators';

export default {

  edit: require('./EditActionCreators'),

  /**
   * Sends the AJAX request to create the template on the server
   * @return {Function} - The thunk that makes the API call
   */
  createTemplate() {
    return (dispatch) => {
      http.post(endpoints.templates.create.path)
        .then(({template}) => {
          dispatch({
            type: CREATE_TEMPLATE_SUCCESS,
            data: {template}
          });
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  /**
   * Executes the API call to delete a template
   * @param  {String} templateId - The `_id` of the template to delete
   * @return {Function}  - The thunk that makes the API call
   */
  deleteTemplate(id) {
    return (dispatch) => {
      http.delete(endpoints.templates.delete(id).path)
        .then(({id}) => {
          dispatch({
            type: DELETE_TEMPLATE_SUCCESS,
            data: {deletedTemplateId: id}
          });
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  fetch() {
    return (dispatch) => {
      // Initiate fetch
      dispatch({type: FETCH_TEMPLATES});

      http.get(endpoints.templates.index.path)
        .then(({templates}) => {
          dispatch({
            type: FETCH_TEMPLATES_SUCCESS,
            data: {templates}
          });
        })
        .catch(({message}) => {
          dispatch({
            type: FETCH_TEMPLATES_ERROR,
            data: {error: message}
          });
        });
    };
  }

};
