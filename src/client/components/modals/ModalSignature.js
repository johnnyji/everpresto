// TODO: To be deleted in favor of `client/views/DocumentSigning/ModalSignature'

import React, {Component, PropTypes} from 'react';
import SignaturePad from 'signature_pad';

const CLS = 'ModalSignature';

export default class ModalSignature extends Component {

  static displayName = CLS;

  static propTypes = {
    onSignature: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    const signaturePad = new SignaturePad(this.refs.canvas);
  }
  
  render() {
    return (
      <div className={CLS}>
        <canvas ref="signaturePad"></canvas>
      </div>
    );
  }

}
