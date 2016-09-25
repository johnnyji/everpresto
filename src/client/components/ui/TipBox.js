import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-TipBox';

@pureRender
export default class TipBox extends Component {

  static displayName = displayName;

  static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    color: PropTypes.oneOf(['light', 'dark']).isRequired,
    className: PropTypes.string,
    headerAlign: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    iconSize: PropTypes.number.isRequired,
    title: PropTypes.string,
    titleClass: PropTypes.string
  };

  static defaultProps = {
    align: 'left',
    color: 'light',
    headerAlign: 'center',
    iconSize: 24
  };
  
  render() {
    const {align, color, className, children, headerAlign, iconSize, title, titleClass} = this.props;
    const classes = classNames(
      className,
      displayName,
      `${displayName}-${color}`,
      `${displayName}-${align}`
    );
    const headerClasses = classNames(
      `${displayName}-header`,
      `${displayName}-header-${headerAlign}`
    );
    const titleClasses = classNames(titleClass, `${displayName}-header-title`);

    return (
      <div className={classes}>
        <header className={headerClasses}>
          <Icon icon='info' iconClass={`${displayName}-header-icon`} size={iconSize} />
          {title && <span className={titleClasses}>{title}</span>}
        </header>
        <div className={`${displayName}-body`}>
          {children}
        </div>
      </div>
    );
  }
}
