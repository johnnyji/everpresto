import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentBody from '.././dashboard/DashboardContentBody';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import DocumentViewer from '.././shared/DocumentViewer';
import FormSidebar from '.././shared/FormSidebar';
import Button from '.././ui/Button';

const displayName = 'DocumentsNewEditorView';

export default class DocumentsNewEditorView extends Component {

  static displayName = displayName;

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
        <DashboardContentBody className={`${displayName}-content`}>
          <DocumentViewer
            body={template.get('body')}
            className={`${displayName}-content-preview`}/>
          <FormSidebar className={`${displayName}-content-sidebar`}>
            <Button
              color='green'
              icon='send'
              onClick={() => {}}
              text='Send'/>
          </FormSidebar>
        </DashboardContentBody>
      </DashboardContentWrapper>
    );
  }

}