import React, {Component, PropTypes}  from 'react';
import classNames from 'classnames';
import Button from '.././ui/Button';
import ModalWrapper from '.././ui/ModalWrapper';

import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'ModalConfirm';

export default class ModalConfirm extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onRegret: PropTypes.func,
    regretText: PropTypes.string.isRequired
  };

  static defaultProps = {
    confirmText: 'Confirm!',
    regretText: 'Nevermind'
  };

  render() {
    const {children, className, confirmText, onConfirm, onRegret, regretText} = this.props;
    const classes = classNames(className, displayName);

    return (
      <ModalWrapper className={classes} height={450} width={600}>
        <div className={`${displayName}-content`}>
          {children}
        </div>
        <div className={`${displayName}-button-group`}>
          <Button
            className={`${displayName}-button-group-button`}
            color='green'
            onClick={onConfirm}
            text={confirmText}/>
          <Button
            className={`${displayName}-button-group-button`}
            color='red'
            onClick={onRegret || this._handleDismissModal}
            text={regretText}/>
        </div>
      </ModalWrapper>
    );
  }

  _handleDismissModal = () => {
    this.context.dispatch(AppActionCreators.dismissModal());
  }

}
