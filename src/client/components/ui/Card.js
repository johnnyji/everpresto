import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Card extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const classes = classNames(this.props.className, 'ui-card');

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

}
