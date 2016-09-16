// import {createFlashMessage} from '../../actions/AppActionCreators';

export default (state) => (location, replace) => {
  debugger;
  if (state.auth.getIn(['user', 'clearanceLevel']) !== 'admin') {
    replace('/dashboard/collections');
  }
};
