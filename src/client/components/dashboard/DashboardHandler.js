import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import DashboardHeader from './DashboardHeader';

const displayName = 'DashboardHandler';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class DashboardHandler extends Component {

  static displayName = displayName;

  // Router history
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: ImmutablePropTypes.contains({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
  };

  render() {
    return (
      <div className={displayName}>
        <DashboardHeader currentUser={this.props.currentUser} />
        {/*Allows the React Router to run the correct child route,
        replaced RouteHandler in v1.0.0*/}
        {this.props.children}
      </div>
    );
  }

}