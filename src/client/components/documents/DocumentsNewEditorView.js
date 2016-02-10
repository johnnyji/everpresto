import React, {Component, PropTypes} from 'react';
import MUITab from 'material-ui/lib/tabs/tab';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import DocumentViewer from '.././shared/DocumentViewer';
import FileUploader from '.././shared/FileUploader';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarFooter from '.././shared/FormSidebarFooter';
import FormSidebarSection from '.././shared/FormSidebarSection';
import FormSidebarSectionTitle from '.././shared/FormSidebarSectionTitle';
import ModalFillPlaceholders from '.././modals/ModalFillPlaceholders';
import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import Tabs from '.././ui/Tabs';

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
              <Tabs>
                <MUITab label='Import Contacts'>
                  <button>Add a signer</button>
                  <FileUploader
                    label={<span><Icon icon='file-upload'/>Import CSV File</span>}
                    onUpload={() => {}}
                    permittedExtensions={['.csv']}/>
                </MUITab>
                <MUITab label='Manually Input Contacts'>
                  Hello 1
                </MUITab>
              </Tabs>
            </FormSidebarBody>
            <FormSidebarFooter>
              <Button
                color='green'
                icon='send'
                onClick={this._handleSendDocuments}
                text='Send'/>
            </FormSidebarFooter>
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