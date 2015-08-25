import React from 'react';
import ReactTemplate from './ReactTemplate';

import AppActions from '../.././actions/AppActions';

export default class FullScreenModal extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_exitModal');
  }
  _exitModal() {
    AppActions.toggleModal();
  }
  render() {
    let p = this.props;
    
    return (
      <div className='full-screen-modal-wrapper'>
        <div className='modal-background' onClick={this._exitModal}></div>
        {p.modalContent}
      </div>
    );
  }
}

FullScreenModal.propTypes = {
  modalContent: React.PropTypes.element.isRequired
};
