import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';

export default class DashboardNavbar extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    let p = this.props;
    let currentPath = this.context.router.getCurrentPathname();
    let links = _.map(p.links, (linkObject, i) => {
      if (linkObject.path === currentPath) {
        return (
          <li key={i}>
            <a className='active-tab'>{linkObject.displayName}</a>
          </li>
        );
      }
      return (
        <li key={i}>
          <Link to={linkObject.path} activeClassName='active-tab'>
            {linkObject.displayName}
          </Link>
        </li>
      );
    });

    return (
      <div className='dashboard-navbar-wrapper'>
        <ul>{links}</ul>
      </div>
    );
  }
}

DashboardNavbar.propTypes = {
  // an array of objects of paths for the router to navigate to
  // [{ path: ..., displayName: ...}, {...}]
  links: React.PropTypes.array.isRequired
};

DashboardNavbar.contextTypes = {
  router: React.PropTypes.func
};