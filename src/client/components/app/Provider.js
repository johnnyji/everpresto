import React, {Children, Component, PropTypes} from 'react';
import AuthHelper from '../.././utils/AuthHelper';
import AppAction from '../.././actions/AppActions';

export default class Provider extends Component {

  // Initiate a context type so that any child component of `Provider` has access to
  // `this.context.currentUser`
  static childContextTypes = {
    currentUser: PropTypes.object
  };

  static propTypes = {
    currentUser: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  // componentWillMount() {
  //   debugger
  //   if (this.props.currentUser) AppActions.setCurrentUser(this.props.currentUser);
  // }

  // This method is required, creates the actual context the child components will access
  getChildContext () {
    return {currentUser: this.props.currentUser};
  }

  render () {
    // Returns the only child of the `Provider` which is the `Router` component that will
    // mount our app
    return Children.only(this.props.children);
  }

}