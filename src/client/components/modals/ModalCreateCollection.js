import React, {Component, PropTypes} from 'react';
import FolderCard from '.././ui/FolderCard';
import Clickable from '.././ui/Clickable';
import ModalWrapper from '.././ui/ModalWrapper';

import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'ModalCreateCollection';

export default class ModalCreateCollection extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    onCreateBlank: PropTypes.func.isRequired,
    onCreatePopulated: PropTypes.func.isRequired
  };

  render() {
    const {onCreateBlank, onCreatePopulated} = this.props;

    return (
      <ModalWrapper className={displayName} width={650} height={450}>
        <FolderCard contentClassName={`${displayName}-folder`}>
          <Clickable
            className={`${displayName}-folder-title`}
            onClick={() => this._handleChooseOption(onCreateBlank)}>
            New Blank Folder
          </Clickable>
        </FolderCard>
        <FolderCard contentClassName={`${displayName}-folder`}>
          <Clickable
            className={`${displayName}-folder-title`}
            onClick={() => this._handleChooseOption(onCreatePopulated)}>
            New Folder With Documents
          </Clickable>
        </FolderCard>
      </ModalWrapper>
    );
  }

  _handleChooseOption = (optionCallback) => {
    this.context.dispatch(AppActionCreators.dismissModal());
    optionCallback();
  }

}