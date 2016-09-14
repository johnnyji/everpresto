/* eslint-disable react/no-danger */
import React, {PureComponent} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import Card from '../../components/ui/Card';
import Clickable from 'ui-components/src/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import ModalSignature from './ModalSignature';
import RequiresDocumentForSigning from './containers/RequiresDocumentForSigning';

@RequiresDocumentForSigning
export default class DocumentSigning extends PureComponent {

  static displayName = 'DocumentSigning';

  static propTypes = {
    document: CustomPropTypes.document.isRequired
  };
  
  render() {
    const {document} = this.props;

    return (
      <div className={styles.main}>
        <header className={styles.header}>everpresto!</header>
        <Card className={styles.document}>
          <main
            className={styles.docuemntContent}
            dangerouslySetInnerHTML={{__html: document.get('body')}} />
          <footer className={styles.footer}>
            {this._renderSignatureBox()}
          </footer>
        </Card>
      </div>
    );
  }

  _renderSignatureBox = () => {
    return (
      <Clickable onClick={this._handleSignatureModal}>
        <span className={styles.mark}>X</span>
        <span className={styles.signLabel}>Sign Here!</span>
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
