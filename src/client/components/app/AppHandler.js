import React, {Component, PropTypes} from 'react';
import {connect} from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FullScreenModal from '.././shared/FullScreenModal';
import NewNoteForm from '.././notes/NewNoteForm';
import NewGroupForm from '.././groups/NewGroupForm';

@connect((state) => ({
  app: state.app
}))
export default class AppHandler extends Component {

  static displayName = 'AppHandler';

  static propTypes = {
    app: ImmutablePropTypes.contains({
      flash: ImmtuablePropTypes.contains({
        color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']),
        message: PropTypes.string,
      }).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const {app} = this.state;

    return (
      <div className='page-wrapper'>
        <FlashMessage color={app.getIn(['flash', 'color'])} message={app.getIn(['flash', 'message'])} />
        <div className='content-container'>
          {/*Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0*/}
          {this.props.children}
        </div>
      </div>
    );
    
  }

}