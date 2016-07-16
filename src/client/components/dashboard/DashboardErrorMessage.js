import React, {Component, PropTypes} from 'react';
import Button from '../ui/Button';
import classNames from 'classnames';
import DashboardMessage from './DashboardMessage';
import pureRender from 'pure-render-decorator';

const CLS = 'DashboardErrorMessage';

@pureRender
export default class DashboardErrorMessage extends Component {
  static displayName = CLS;

  static propTypes = {
    buttonText: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  };

  render() {
    const {buttonText, className, onClick, text} = this.props;

    return (
      <DashboardMessage className={classNames(className, CLS)}>
        <p className={`${CLS}-text`}>{text}</p>
        {buttonText && onClick &&
          <Button
            color="red"
            onClick={onClick}
            text={buttonText} />
        }
      </DashboardMessage>
    );
  }
}
