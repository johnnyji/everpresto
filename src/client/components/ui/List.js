import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-List';

@pureRender
export default class List extends Component {

  static displayName = displayName;

  static propTypes = {
   className: PropTypes.string
  };

  render() {
    const {className, children} = props;

    return <ul className={classNames(className, displayName)}>{children}</ul>;
  }
}
