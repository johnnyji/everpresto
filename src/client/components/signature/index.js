import React, {Component} from 'react';
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
        <h2>{document.getIn(['signer', 'firstName'])} {document.getIn(['signer', 'firstName'])} needs you to sign something!</h2>
      </div>
    );
  }

}

