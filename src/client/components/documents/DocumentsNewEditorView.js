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
import Icon from '.././ui/Icon';
import ListItem from '.././ui/ListItem';
import Tabs from '.././ui/Tabs';

import {matchesAttr} from '../.././utils/immutable/IterableFunctions';
import {minLength} from '../.././utils/RegexHelper';

import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';
import {template} from '../.././config/main';

const displayName = 'DocumentsNewEditorView';
const isGeneral = matchesAttr('type', 'general');
const isSpecific = matchesAttr('type', 'specific');

// TODO: Move this elsewhere more appropriate
const replacePlaceholders = (body, signerFields) => {
  return signerFields.reduce((alteredBody, field) => {
    return alteredBody.replace(
      new RegExp(field.get('placeholder'), 'g'),
      `<span class="${template.replacedPlaceholderClass}">${field.get('value')}</span>`
    );
  }, body);
};

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

  componentWillReceiveProps(nextProps) {
    // TODO: Find a way to inexpensively compare `generalPlaceholderForm` props to see if they've changed,
    // so that we can also update the document viewer to reflect the newly inputted placeholders

    // If all the signers are removed, set the preview document to original placeholders
    const nextSigners = nextProps.doc.get('signers');
    const nextTemplateBody = nextProps.doc.getIn(['template', 'body']);

    if (nextSigners.size === 0) return this.setState({templateBody: nextTemplateBody});

    // If the signers have changed, make sure the example placeholder fillers are still of the
    // very top signer in the list of signers
    const currentSigners = this.props.doc.get('signers');
    if (!currentSigners.equals(nextSigners) && nextSigners.has(0)) {
      this.setState({
        templateBody: replacePlaceholders(nextTemplateBody, nextSigners.get(0))
      });
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
                  <FormSidebarSectionFillGeneralPlaceholders
                    placeholders={generalPlaceholders}/>
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
    if (this.props.doc.get('signers').size === 0) {
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