import React, {Component, PropTypes} from 'react';
import DocumentEditor from '.././shared/DocumentEditor';
import ModalWrapper from '.././ui/ModalWrapper';

const displayName = 'ModalDocumentPreview';

export default class ModalDocumentPreview extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const {body, title} = this.props;

    return (
      <ModalWrapper className={displayName} height={600} width={500}>
        <h3 className={`${displayName}-title`}>{title}</h3>
        <div
          className={`${displayName}-body`}
          contentEditable
          dangerouslySetInnerHTML={{__html: body}}
          disabled
          onFocus={(e => e.target.blur())}/>
      </ModalWrapper>
    );
  }

}
