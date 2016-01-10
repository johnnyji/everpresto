import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '.././CustomPropTypes';
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
        <DocumentViewer
          body={template.get('body')}
          className={`${displayName}-preview`}/>
        <FormSidebar className={`${displayName}-sidebar`}>
          <Button
            color='green'
            icon='send'
            onClick={() => {}}
            text='Send'/>
        </FormSidebar>
      </DashboardContentWrapper>
    );
  }
}
