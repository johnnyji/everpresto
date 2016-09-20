import {
  CLOSE_SIDENAV,
  CREATE_FLASH_MESSAGE,
  CREATE_MODAL,
  DISMISS_FLASH_MESSAGE,
  DISMISS_MODAL,
  OPEN_SIDENAV
} from './../action_types/AppActionTypes';

export default {

  createFlashMessage(color = 'blue', message) {
    return {
      type: CREATE_FLASH_MESSAGE,
      data: {color, message}
    };
  },

  dismissFlashMessage() {
    return {
      type: DISMISS_FLASH_MESSAGE,
      data: {color: null, message: null}
    };
  },

  createModal(modalElement) {
    return {
      type: CREATE_MODAL,
      data: {modalElement}
    };
  },

  dismissModal() {
    return {
      type: DISMISS_MODAL,
      data: {modalElement: null}
    };
  },

  openSidebar() {
    return {
      type: OPEN_SIDENAV,
    };
  },

  closeSidebar() {
    return {
      type: CLOSE_SIDENAV
    };
  }

};
