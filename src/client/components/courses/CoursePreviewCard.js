import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from '.././ui/Card';

const displayName = 'CoursePreviewCard';

export default class CoursePreviewCard extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const classes = classNames(displayName, this.props.className);

    return (
      <button className={classes} onClick={this.props.onClick}>
        <Card className={`${displayName}-card`}>
          {this.props.children}
        </Card>
      </button>
    );
  }
}
