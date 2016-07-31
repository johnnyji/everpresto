import {Component} from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class DashboardView extends Component {

  static displayName = 'DashboardView';

  render() {
    return this.props.children;
  }

}
