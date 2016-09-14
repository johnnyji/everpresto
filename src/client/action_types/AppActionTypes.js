import {createConstants} from 'create-reducer-redux';

const AppActionTypes = createConstants([
  'CREATE_FLASH_MESSAGE',
  'CREATE_MODAL',
  'DISMISS_FLASH_MESSAGE',
  'DISMISS_MODAL'
]);

export default AppActionTypes;
