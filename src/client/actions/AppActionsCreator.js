import AppActionTypes from './../action_types/AppActionTypes';

const AppActionsCreator = {

  createFlashMessage(color = 'blue', message) {
    return {
      type: AppActionTypes.CREATE_FLASH_MESSAGE,
      data: {color, message}
    };
  },

  dismissFlashMessage() {
    return {
      type: AppActionTypes.DISMISS_FLASH_MESSAGE,
      data: {color: null, message: null}
    }
  }

}

export default AppActionsCreator;