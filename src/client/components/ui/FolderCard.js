import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-FolderCard';

@pureRender
export default class FolderCard extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 150,
    width: 200
  };

  render() {
    const {className, children, contentClassName, height, width} = this.props;
    const classes = classNames(className, displayName);
    const contentClasses = classNames(`${displayName}-main`, contentClassName);
    const styles = {height, width};

    return (
      <div className={classes} style={styles}>
        <div className={`${displayName}-tab`}>
          <div className={`${displayName}-tab-left`}/>
          <div className={`${displayName}-tab-right`}/>
        </div>
        <div className={contentClasses}>
          {children}
        </div>
      </div>
    );
  }
}
