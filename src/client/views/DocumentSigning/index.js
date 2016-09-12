/* eslint-disable react/no-danger */
import React, {PureComponent} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import Card from '../../components/ui/Card';
import Clickable from 'ui-components/src/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import ModalSignature from './ModalSignature';
import RequiresDocumentForSigning from './containers/RequiresDocumentForSigning';

const CLS = 'DocumentSigningView';

@RequiresDocumentForSigning
export default class DocumentSigningView extends PureComponent {

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
      <Clickable onClick={this._handleSignatureModal}>
        <span className={`${CLS}-document-footer-mark`}>X</span>
        <span className={`${CLS}-document-footer-sign`}>Sign Here!</span>
      </Clickable>
    );
  };

  _handleSignatureModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalSignature onSignature={this._handleSignature} />
      )
    );
  };

  _handleSignature = (signature) => {
    debugger;
  }

}
/* eslint-enable react/no-danger */
