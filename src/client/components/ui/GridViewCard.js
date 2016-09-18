import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import Card from './Card';

const displayName = 'ui-GridViewCard';

@pureRender
export default class GridViewCard extends Component {
  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    height: PropTypes.number
  };

  static defaultProps = {
    height: 300
  };

  render() {
    const {children, className, height} = this.props;

    return (
      <Card
        className={classNames(displayName, className)}
        style={{height}}>
        {children}
      </Card>
    );
  }
}
