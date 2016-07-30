/* eslint-disable react/no-danger */
import React, {Component} from 'react';
import Card from '../ui/Card';
import Clickable from '../ui/Clickable';
import CustomPropTypes from '../CustomPropTypes';
import RequiresDocumentForSigning from '../../containers/RequiresDocumentForSigning';

const CLS = 'SignatureView';

@RequiresDocumentForSigning
export default class SignatureView extends Component {

  static displayName = CLS;

  static propTypes = {
    document: CustomPropTypes.document.isRequired
  };
  
  render() {
    const {document} = this.props;

    return (
      <div className={CLS}>
        <header className={`${CLS}-header`}>everpresto!</header>
        <Card className={`${CLS}-document`}>
          <main
            className={`${CLS}-document-body`}
            dangerouslySetInnerHTML={{__html: document.get('body')}} />
          <footer className={`${CLS}-document-footer`}>
            {this._renderSignatureBox()}
          </footer>
        </Card>
      </div>
    );
  }

  _renderSignatureBox = () => {
    return (
      <Clickable onClick={this._handleReadyToSign}>
        <span className={`${CLS}-document-footer-mark`}>X</span>
        <span className={`${CLS}-document-footer-sign`}>Sign Here!</span>
      </Clickable>
    );
  };

  _handleReadyToSign = () => {
  };

}
/* eslint-enable react/no-danger */
