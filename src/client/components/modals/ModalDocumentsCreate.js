import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Icon from '../ui/Icon';
import {Link} from 'react-router';
import ModalWrapper from '../ui/ModalWrapper';
import ProgressBar from '../ui/ProgressBar';
import Spinner from '../ui/Spinner';

const displayName = 'ModalDocumentsCreate';

/* The modal that pops up when the a group of documents are
 * initially being created. This modal shows the user a progress bar
 * and count as each document is being saved to the database and emailed to
 * their signer
 *
 * Triggered in `DocumentsNewEditorView`
 */
@connect((state) => ({
  progressCount: state.documentsNew.get('emailsSentCount'),
  saved: state.documentsNew.get('saved'),
  saving: state.documentsNew.get('saving'),
  totalCount: state.documentsNew.getIn(['doc', 'signers']).size
}))
export default class ModalDocumentsCreate extends Component {

  static displayName = displayName;

  static propTypes = {
    progressCount: PropTypes.number.isRequired,
    saved: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired
  };
  
  render() {
    const {progressCount, totalCount} = this.props;

    return (
      <ModalWrapper className={displayName} height={500} width={600}>
        {this._renderHeader()}
        <ProgressBar progressCount={progressCount} totalCount={totalCount} />
        <footer className={`${displayName}-footer`}>
          <Link to={`/dashboard/collections/${this.props.params.collection_id}`}>
            Taking too long? Skip the waiting here
          </Link>
        </footer>
      </ModalWrapper>
    );
  }

  _renderHeader() {
    // When the documents are emailing and saving, we want to show the
    // numbers of documents saved so far
    if (this.props.saving) {
      return (
        <header className={`${displayName}-header`}>
          {this.props.progressCount} / {this.props.totalCount}
        </header>
      );
    }

    // When all the documents have been saved and sent
    if (this.props.saved) {
      return (
        <header className={`${displayName}-header`}>
          All Documents Saved <Icon icon='check' />
        </header>
      );
    }

    return (
      <header className={`${displayName}-header`}>
        <Spinner quote='Hold up, one moment please :)' />
      </header>
    );
  }

}

