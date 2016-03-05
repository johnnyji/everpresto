import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import Card from '.././ui/Card';

const displayName = 'PreviewCard'

@pureRender
export default class PreviewCard extends Component {
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
        className={classNames(className, displayName)}
        style={{height: `${height}px`}}>
        {children}
      </Card>
    );
  }
}
