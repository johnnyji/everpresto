import AppActionTypes from './../action_types/AppActionTypes';

const AppActionCreators = {

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
  },

  createModal(modalElement) {
    return {
      type: AppActionTypes.CREATE_MODAL,
      data: {modalElement: modalElement}
    };
  },

  dismissModal() {
    return {
      type: AppActionTypes.DISMISS_MODAL,
      data: {modalElement: null}
    }
  }

}

export default AppActionCreators;