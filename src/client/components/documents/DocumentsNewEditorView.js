import React, {Component, PropTypes} from 'react';
import MUITab from 'material-ui/lib/tabs/tab';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import DocumentViewer from '.././shared/DocumentViewer';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarFooter from '.././shared/FormSidebarFooter';
import FormSidebarSection from '.././shared/FormSidebarSection';
import FormSidebarSectionAddSigner from '.././shared/FormSidebarSectionAddSigner';
import FormSidebarSectionFillGeneralPlaceholders from '.././shared/FormSidebarSectionFillGeneralPlaceholders';
import FormSidebarSectionMessage from '.././shared/FormSidebarSectionMessage';
import Button from '.././ui/Button';
import ListItem from '.././ui/ListItem';
import Tabs from '.././ui/Tabs';

import {matchesAttr} from '../.././utils/immutable/IterableFunctions';
import Config from '../.././config/main';

import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';

const displayName = 'DocumentsNewEditorView';
const isGeneral = matchesAttr('type', 'general');
const isSpecific = matchesAttr('type', 'specific');

// TODO: Move this elsewhere more appropriate
const replacePlacholders = (type) => (body, placeholderFields) => {
  return placeholderFields.reduce((alteredBody, field) => {
    if (!field.get('value')) return alteredBody;

    return alteredBody.replace(
      new RegExp(field.get('placeholder'), 'g'),
      `<span class="${Config.doc.placeholderClasses[type]}">${field.get('value')}</span>`
    );
  }, body);
};

const replaceSpecificFields = replacePlacholders('specific');
const replaceGeneralFields = replacePlacholders('general');

export default class DocumentsNewEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    doc: ImmutablePropTypes.contains({
      collectionId: PropTypes.string,
      signers: ImmutablePropTypes.listOf(
        ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            placeholder: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
          }).isRequired
        )
      ).isRequired,
      // This is the general placeholders form the users fill out
      generalPlaceholderForm: ImmutablePropTypes.contains({
        values: ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            placeholder: PropTypes.string,
            value: PropTypes.string
          })
        ).isRequired,
        errors: ImmutablePropTypes.listOf(PropTypes.string).isRequired
      }).isRequired,
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

  // TODO: This is too slow and is computing way too much, find way to speed this up
  componentWillReceiveProps(nextProps) {
    const nextGeneralFields = nextProps.generalPlaceholderForm.get('values');
    const nextSigners = nextProps.doc.get('signers');

    const placeholdersHaveChanged =
      !this.props.doc.get('signers').equals(nextSigners) || !nextGeneralFields.equals(this.props.generalFields);

    // If the placeholders have changed, replace fields
    if (placeholdersHaveChanged) {
      // Replace all the general placeholders
      let alteredNextTemplateBody = replaceGeneralFields(
          nextProps.doc.getIn(['template', 'body']),
          nextGeneralFields
      );
      // If there are any signers, use the first signer as example
      if (nextSigners.has(0)) {
        alteredNextTemplateBody = replaceSpecificFields(alteredNextTemplateBody, nextSigners.get(0));
      }
      // Reset the example body state
      this.setState({templateBody: alteredNextTemplateBody});
    }

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
                    <FormSidebarSectionAddSigner placeholders={specificPlaceholders}/>
                    <FormSidebarSection className={`${displayName}-content-sidebar-signers-list`}>
                      {this._renderSigners()}
                    </FormSidebarSection>
                  </FormSidebarSection>
                </MUITab>
                {/* General Placeholder Inputs */}
                <MUITab label='Fill Placeholders'>
                  <FormSidebarSectionFillGeneralPlaceholders placeholders={generalPlaceholders}/>
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

  _renderSigners = () => {
    if (!this.props.doc.get('signers').size) {
      return (
        <FormSidebarSectionMessage>
          Add/Import some signers to get started!
        </FormSidebarSectionMessage>
      );
    }

    return this.props.doc.get('signers').map((signer, i) => (
      <ListItem
        className={`${displayName}-content-sidebar-signer`}
        onRemove={() => this._handleRemoveSigner(signer)}
        key={i}
        removable={true}>
        {signer.map((field, i) => <span key={i}>{field.get('value')}</span>)}
      </ListItem>
    ));
  };

  _handleRemoveSigner = (signer) => {
    this.context.dispatch(DocumentNewActionCreators.removeSigner(signer));
  };

  _handleSendDocuments = () => {
    debugger;
  };

}