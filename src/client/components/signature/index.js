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
    return (
      <div className={CLS}>
      </div>
    );
  }

}

