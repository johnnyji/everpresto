import React, {Component, PropTypes} from 'react';
import MUITab from 'material-ui/lib/tabs/tab';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import DocumentViewer from '.././shared/DocumentViewer';
import FileUploader from '.././shared/FileUploader';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarFooter from '.././shared/FormSidebarFooter';
import FormSidebarSection from '.././shared/FormSidebarSection';
import FormSidebarSectionAddSigner from '.././shared/FormSidebarSectionAddSigner';
import FormSidebarSectionMessage from '.././shared/FormSidebarSectionMessage';
import ModalFillPlaceholders from '.././modals/ModalFillPlaceholders';
import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import Tabs from '.././ui/Tabs';

import {matchesAttr} from '../.././utils/immutable/IterableFunctions';
import {minLength} from '../.././utils/RegexHelper';
import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'DocumentsNewEditorView';
const isGeneral = matchesAttr('type', 'general');
const isSpecific = matchesAttr('type', 'specific');

export default class DocumentsNewEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    doc: ImmutablePropTypes.contains({
      collectionId: PropTypes.string,
      template: CustomPropTypes.template.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    // Template body needs to be a state so we can alter and display the placeholder
    // values as the user fills them in
    this.state = {
      templateBody: props.doc.getIn(['template', 'body'])
    };
  }

  render() {
    const {doc} = this.props;
    const {templateBody} = this.state;

    const generalPlaceholders = doc.getIn(['template', 'placeholders']).filter(isGeneral);
    const specificPlaceholders = doc.getIn(['template', 'placeholders']).filter(isSpecific);

    return (
      <DashboardContentWrapper className={displayName}>
        <DashboardContentHeader className={`${displayName}-header`}>
          <header className={`${displayName}-header-title`}>
            Step 2/2: <em className={`${displayName}-header-title-main`}>Tweak It, Send It!</em>
          </header>
        </DashboardContentHeader>
        <div className={`${displayName}-content`}>
          <DocumentViewer
            body={templateBody}
            className={`${displayName}-content-preview`}/>
          <FormSidebar className={`${displayName}-content-sidebar`}>
            <FormSidebarBody>
              <Tabs>

                {/* Specific Placeholder Inputs */}
                <MUITab label={`Add Signers (${doc.get('signers').size})`}>
                  <FormSidebarSection>
                    <FileUploader
                      label={<span><Icon icon='file-upload'/>Too many signers? Import CSV</span>}
                      onUpload={() => {}}
                      permittedExtensions={['.csv']}/>
                    <FormSidebarSectionAddSigner
                      onAddSigner={() => {}}
                      placeholders={specificPlaceholders}/>
                    <FormSidebarSection>
                      {this._renderSigners()}
                    </FormSidebarSection>
                  </FormSidebarSection>
                </MUITab>

                {/* General Placeholder Inputs */}
                <MUITab label='Fill Placeholders'>
                  {generalPlaceholders.size > 0 &&
                    <FormSidebarSection>
                      <ul className={`${displayName}-content-sidebar-placeholders-general`}>
                        {this._renderGeneralPlaceholders(generalPlaceholders)}
                      </ul>
                    </FormSidebarSection>
                  }
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

  _addNewContact = () => {

  };

  _renderGeneralPlaceholders = (placeholders) => {
    return placeholders.map((placeholder, i) => (
      <li key={i}>
        <Input
          error={''}
          errorKeys={`errors:${i}`}
          label={placeholder.get('value')}
          onUpdate={(val, err) => this._updatePlaceholder(val, err, i)}
          patternMatches={minLength(1, `Lets give ${placeholder.get('value')} a value`)}
          successKeys={`values:${i}:header`}
          value={'hello'}
          width={250}/>
      </li>
    ));
  };

  _renderSigners = () => {
    if (this.props.doc.get('signers').size === 0) {
      return (
        <FormSidebarSectionMessage>
          Add/Import some signers to get started!
        </FormSidebarSectionMessage>
      );
    }

    return [1,3,3].map(() => (
      <div className={`${displayName}-content-sidebar-signer`}>
        <span className={`${displayName}-content-sidebar-signer-field`}>
          Johnny
        </span>
        <span className={`${displayName}-content-sidebar-signer-field`}>
          Ji
        </span>
        <span className={`${displayName}-content-sidebar-signer-field`}>
          johnny@johnnyji.com
        </span>
      </div>
    ));
  };

  _handleSendDocuments = () => {
    debugger;
  };

  // _showReplacePlaceholdersModal = () => {
  //   this.context.dispatch(
  //     AppActionCreators.createModal(
  //       <ModalFillPlaceholders placeholders={this.props.template.get('placeholders')}/>
  //     )
  //   );
  // };

  _updatePlaceholder = (val, err, i) => {

  };

}