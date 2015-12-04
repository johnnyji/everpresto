import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

// This component restricts it's children to the app's min and max width
const displayName = 'AppContentWrapper';

export default class AppContentWrapper extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {children, className} = this.props;
    const classes = classNames(className, displayName);

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }

}
