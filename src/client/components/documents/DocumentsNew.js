import React, {Children, Component, PropTypes} from 'react';
import AppActionCreators from '../.././actions/AppActionCreators';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardErrorMessage from '../dashboard/DashboardErrorMessage';
import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RequiresTemplates from '../../containers/RequiresTemplates';

const displayName = 'DocumentsNew';

@RequiresTemplates
@connect((state) => ({
  docBeingCreated: state.documentsNew.get('doc'),
  emailsSentCount: state.documentsNew.get('emailsSentCount'),
  generalPlaceholderForm: state.documentsNew.get('generalPlaceholderForm'),
  modalIsDisplayed: state.app.getIn(['modal', 'display']),
  saved: state.documentsNew.get('saved'),
  saving: state.documentsNew.get('saving'),
  shouldClearSpecificPlaceholderForm: state.documentsNew.get('shouldClearSpecificPlaceholderForm'),
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  specificPlaceholderForm: state.documentsNew.get('specificPlaceholderForm'),
  templateFilterTerms: state.documentsNew.get('templateFilterTerms'),
  templates: state.templates.get('templates')
}))
export default class DocumentsNew extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static propTypes = {
    // TODO: Create actual proptype for `docBeingCreated`
    docBeingCreated: ImmutablePropTypes.map.isRequired,
    emailsSentCount: PropTypes.number.isRequired,
    generalPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    modalIsDisplayed: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      collection_id: PropTypes.string
    }).isRequired,
    saved: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    shouldClearSpecificPlaceholderForm: PropTypes.bool.isRequired,
    shouldFetchTemplates: PropTypes.bool.isRequired,
    specificPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    templateFilterTerms: PropTypes.string.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      filteredTemplates: props.templates
    };
  }

  componentWillMount() {
    // Sets the new document's collection id
    this.context.dispatch(
      DocumentNewActionCreators.setCollection(this.props.params.collection_id)
    );
  }

  componentWillReceiveProps(nextProps) {
    // Navigate the user to the collections view once their documents have been
    // created
    if (!this.props.saved && nextProps.saved) {
      this.context.router.push(`/dashboard/collections/${this.props.params.collection_id}`);
    }

    // If the filter terms are different, we want to reset the filtered templates
    // by the filter terms
    const filterTermsHaveChanged = nextProps.templateFilterTerms !== this.props.templateFilterTerms;
    const templatesHaveChanged = !nextProps.templates.equals(this.props.templates);

    if (filterTermsHaveChanged || templatesHaveChanged) {
      this.setState({
        filteredTemplates: nextProps.templates.filter((template) => (
          template.get('title').toLowerCase().includes(nextProps.templateFilterTerms.trim().toLowerCase())
        ))
      });
    }
  }

  componentWillUnmount() {
    // Clears the new document state when the user decides to leave,
    // or when the new document(s) are created and the view dismounts
    this.context.dispatch(DocumentNewActionCreators.resetState());

    // Removes any existing modals
    if (this.props.modalIsDisplayed) {
      this.context.dispatch(AppActionCreators.dismissModal());
    }
  }

  render() {
    const {children, location, params, templateFilterTerms} = this.props;
    const basePathname = `/dashboard/collections/${params.collection_id}/documents/new`;

    // This is the stage where users choose a template
    if (location.pathname === `${basePathname}/choose_template`) {
      return React.cloneElement(Children.only(children), {
        templateFilterTerms,
        templates: this.state.filteredTemplates
      });
    }

    // This stage allows users to replace placeholders, add signers,
    // and create the documents
    if (location.pathname === `${basePathname}/add_signers`) {
      return React.cloneElement(Children.only(children), {
        doc: this.props.docBeingCreated,
        emailsSentCount: this.props.emailsSentCount,
        generalPlaceholderForm: this.props.generalPlaceholderForm,
        saving: this.props.saving,
        shouldClearSpecificPlaceholderForm: this.props.shouldClearSpecificPlaceholderForm,
        specificPlaceholderForm: this.props.specificPlaceholderForm
      });
    }

    // If the URL doesn't match the two above, it means it's malformed
    // and we need to show a message to the user
    // TODO: Test and style this
    return (
      <DashboardErrorMessage
        buttonText="Go Back"
        onClick={this._handleCollectionView}
        text="Ugh, Something Probably Went Wrong..." />
    );
  }

  _handleCollectionView = () => {
    this.context.router.push(`/dashboard/collections/${this.props.params.collection_id}`);
  };

  _handleTemplateChoose = (template) => {
    this.context.dispatch(DocumentNewActionCreators.setTemplate(template));
  };

  _handleTemplateFilter = (templateFilterTerms) => {
    this.setState({templateFilterTerms});
  };

}
