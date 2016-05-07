import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'Card';

@pureRender
export default class Card extends Component {

  static displayName = displayName;
  
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    const {children, className, style} = this.props;
    const classes = classNames(className, 'ui-Card');

    if (style) return <div className={classes} style={style}>{children}</div>;
    return <div className={classes}>{children}</div>;
  }

}
