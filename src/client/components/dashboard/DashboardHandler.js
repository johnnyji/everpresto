import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardHeader from './DashboardHeader';
import menuConfig from '../../config/menu';
import styles from './styles/DashboardHandler.scss';

@connect((state) => ({
  currentUser: state.auth.get('user'),
  sidenavShown: state.app.get('sidenavShown')
}))
export default class DashboardHandler extends PureComponent {

  static displayName = 'DashboardHandler';

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    sidenavShown: PropTypes.bool.isRequired
  };

  componentWillReceiveProps({currentUser}) {
    if (!currentUser) this.context.router.replace('/');
  }

  render() {
    return (
      <div className={styles.main} id={menuConfig.pageWrapId}>
        <DashboardHeader currentUser={this.props.currentUser} sidenavShown={this.props.sidenavShown} />
        {/* <HorizontalNavbar links={DASHBOARD_TABS} /> */}
        {/* Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0 */}
        {this.props.children}
      </div>
    );
  }

}
