import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import DocumentViewer from '.././shared/DocumentViewer';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarSection from '.././shared/FormSidebarSection';
import ModalFillPlaceholders from '.././modals/ModalFillPlaceholders';
import Button from '.././ui/Button';

import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'DocumentsNewEditorView';

export default class DocumentsNewEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    template: CustomPropTypes.template.isRequired
  };

  render() {
    const {template} = this.props;

    return (
      <DashboardContentWrapper className={displayName}>
        <DashboardContentHeader className={`${displayName}-header`}>
          <header className={`${displayName}-header-title`}>
            Step 2/2: <em className={`${displayName}-header-title-main`}>Tweak It, Send It!</em>
          </header>
        </DashboardContentHeader>
        <div className={`${displayName}-content`}>
          <DocumentViewer
            body={template.get('body')}
            className={`${displayName}-content-preview`}/>
          <FormSidebar className={`${displayName}-content-sidebar`}>
            <FormSidebarBody>
              <FormSidebarSection>
                <Button
                  color='blue'
                  icon='edit'
                  onClick={this._showReplacePlaceholdersModal}
                  text='Fill Placeholders'/>
              </FormSidebarSection>
            </FormSidebarBody>
            <Button
              color='green'
              icon='send'
              onClick={this._handleSendDocuments}
              text='Send'/>
          </FormSidebar>
        </div>
      </DashboardContentWrapper>
    );
  }

  _handleSendDocuments = () => {
    debugger;
  };

  _showReplacePlaceholdersModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalFillPlaceholders placeholders={this.props.template.get('placeholders')}/>
      )
    );
  };

}