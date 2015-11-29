import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FlashMessage from '.././ui/FlashMessage';

const displayName = 'AppHandler';

@connect((state) => ({
  app: state.app
}))
export default class AppHandler extends Component {

  static displayName = displayName;

  static propTypes = {
    app: ImmutablePropTypes.contains({
      flash: ImmutablePropTypes.contains({
        color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']),
        message: PropTypes.string,
      }).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static childContextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  // Sets the store's `dispatch` method as context accesible on any child component
  getChildContext() {
    return {
      dispatch: this.props.dispatch
    };
  }

  render() {
    const {app} = this.props;
    const flashMessage = app.getIn(['flash', 'message']);

    return (
      <div className={displayName}>
        {Boolean(flashMessage) && <FlashMessage color={app.getIn(['flash', 'color'])} content={flashMessage} />}

        <div className={`${displayName}-content-container`}>
          {/*Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0*/}
          {this.props.children}
        </div>
      </div>
    );

  }

}