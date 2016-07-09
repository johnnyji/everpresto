import React, {Component, PropTypes} from 'react';
import AppContentWrapper from '../app/AppContentWrapper';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'DashboardContentHeader';

@pureRender
export default class DashboardContentHeader extends Component {

  static displayName = displayName;

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  render() {
    const {children, className} = this.props;

    return (
      <AppContentWrapper className={classNames(className, displayName)}>
        {children}
      </AppContentWrapper>
    );
  }
}
