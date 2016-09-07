import React, {Component, PropTypes} from 'react';
import SignaturePad from 'ui-components/src/SignaturePad';

const CLS = 'ModalSignature';

export default class ModalSignature extends Component {

  static displayName = CLS;

  static propTypes = {
    onSignature: PropTypes.func.isRequired
  };
  
  render() {
    return (
      <div className={CLS}>
        <SignaturePad />
      </div>
    );
  }

}

