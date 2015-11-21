import AppActionTypes from './../action_types/AppActionTypes';

const AppActionsCreator = {
  createFlashMessage(color = 'blue', message) {
    return {
      type: AppActionTypes.CREATE_FLASH_MESSAGE,
      data: {color, message}
    };
  },

}

export default AppActionsCreator;