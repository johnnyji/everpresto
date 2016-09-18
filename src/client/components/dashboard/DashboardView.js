import {PureComponent} from 'react';

// This is used in `routes.js` as a route wrapper component

export default class DashboardView extends PureComponent {

  static displayName = 'DashboardView';

  render() {
    return this.props.children;
  }

}
