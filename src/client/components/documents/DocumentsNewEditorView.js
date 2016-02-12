import React, {Component, PropTypes} from 'react';
import MUIRoundButton from 'material-ui/lib/floating-action-button';
import MUITab from 'material-ui/lib/tabs/tab';
import Immutable from 'immutable';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import DocumentViewer from '.././shared/DocumentViewer';
import FileUploader from '.././shared/FileUploader';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarFooter from '.././shared/FormSidebarFooter';
import FormSidebarSection from '.././shared/FormSidebarSection';
import ModalFillPlaceholders from '.././modals/ModalFillPlaceholders';
import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import Tabs from '.././ui/Tabs';

import {matchesAttr} from '../.././utils/immutable/IterableFunctions';
import {minLength} from '../.././utils/RegexHelper';
import AppActionCreators from '../.././actions/AppActionCreators';

const BRAND_COLOR_BLUE = '#4E9CC2';

const displayName = 'DocumentsNewEditorView';
const isGeneral = matchesAttr('type', 'general');
const isSpecific = matchesAttr('type', 'specific');

export default class DocumentsNewEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    template: CustomPropTypes.template.isRequired
  };

  constructor(props) {
    super(props);
    // Template body needs to be a state so we can alter and display the placeholder
    // values as the user fills them in
    this.state = {
      templateBody: props.template.get('body'),
      signers: Immutable.List()
    };
  }

  render() {
    const {template} = this.props;
    const {signers, templateBody} = this.state;
    const generalPlaceholders = template.get('placeholders').filter(isGeneral);

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
                <MUITab label={`Add Signers (${signers.size})`}>
                  <FormSidebarSection>
                    <FormSidebarSection className={`${displayName}-content-sidebar-signer-new`}>
                      <section className={`${displayName}-content-sidebar-signer-new-fields`}>
                        {this._renderNewSignerFields()}
                      </section>
                      <aside className={`${displayName}-content-sidebar-signer-new-add-button`}>
                        <MUIRoundButton
                          backgroundColor={BRAND_COLOR_BLUE}
                          mini={true}
                          onTouchEnd={this._addNewContact}>
                          <Icon icon='add' />
                        </MUIRoundButton>
                      </aside>
                    </FormSidebarSection>
                    <FormSidebarSection>
                      <FileUploader
                        className={`${displayName}-content-sidebar-signer-import-new`}
                        label={<span><Icon icon='file-upload'/>Too many signers? Import CSV Instead</span>}
                        onUpload={() => {}}
                        permittedExtensions={['.csv']}/>
                    </FormSidebarSection>
                    {this._renderSigners()}
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

  _renderNewSignerFields = () => {
    return this.props.template
      .get('placeholders')
      .filter(isSpecific)
      .map((placeholder, i) => (
        <Input
          className={`${displayName}-content-sidebar-signer-new-fields-field`}
          error={''}
          errorKeys={`errors:${i}`}
          key={i}
          label={placeholder.get('value')}
          onUpdate={(val, err) => this._updatePlaceholder(val, err, i)}
          patternMatches={minLength(1, `Lets give ${placeholder.get('value')} a value`)}
          successKeys={`values:${i}:header`}
          value={'hello'}
          width={300}/>
      ));
  };

  _renderSigners = () => {
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

  _showReplacePlaceholdersModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalFillPlaceholders placeholders={this.props.template.get('placeholders')}/>
      )
    );
  };

  _updatePlaceholder = (val, err, i) => {

  };

}