import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardQuote from '.././dashboard/DashboardQuote';
import DocumentNewActionCreators from '../../actions/DocumentNewActionCreators';
import DocumentsNewTemplatePreviewCard from './DocumentsNewTemplatePreviewCard';
import pureRender from 'pure-render-decorator';
import SearchBar from '.././ui/SearchBar';

const displayName = 'DocumentsNewChooseTemplateView';

@pureRender
export default class DocumentsNewChooseTemplateView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static propTypes = {
    // Because this component is its own route, it will be first rendered by
    // React Router, and then rendered by DocumentsNew,
    // it won't have props on the initial render iteration, therefore none of
    // these props can be `isRequired`
    basePathname: PropTypes.string,
    templateBeingUsed: CustomPropTypes.template,
    templateFilterTerms: PropTypes.string,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template)
  };

  componentWillMount() {
    // When the component first mounts, we need to ensure that the document being created
    // does not have a template already chosen, otherwise it defeats the entire purpose of
    // this component! This will mostly be used for when the user chose a template but
    // decided they want to pick another one and hit the `back` button in the browser, which
    // will cause this component to re-mount even though a template has already been choosen.
    this.context.dispatch(DocumentNewActionCreators.setTemplate(null));
  }

  componentWillReceiveProps(nextProps) {
    // Once the user has picked a template, we want to move them onto the editor view
    if (!this.props.templateBeingUsed && nextProps.templateBeingUsed) {
      this.context.router.push(
        `${nextProps.basePathname}/${nextProps.templateBeingUsed.get('id')}/add_signers`
      );
    }
  }

  render() {
    const {templateFilterTerms, templates} = this.props;

    return (
      <DashboardContentWrapper className={displayName}>
        <DashboardContentHeader className={`${displayName}-header`}>
          <header className={`${displayName}-header-title`}>
            Step 1/2: <em className={`${displayName}-header-title-main`}>Choose A Template</em>
          </header>
          <SearchBar
            className={`${displayName}-header-search-bar`}
            focusLabel='Alright Here We Go!'
            label='Search Templates...'
            onUpdate={this._handleTemplateFilter}
            value={templateFilterTerms} />
        </DashboardContentHeader>
          {templates.size > 0 &&
            <div className={`${displayName}-templates`}>
              {this._renderTemplatePreviewCards(templates)}
            </div>
          }
          {templates.size === 0 &&
            <DashboardQuote
              author="Ol' Ben Kenobi"
              className={`${displayName}-not-found`}
              quote="This is the not the template you're looking for..." />
          }
      </DashboardContentWrapper>
    );
  }

  _renderTemplatePreviewCards = (templates) => {
    return templates.map((template, i) => (
      <DocumentsNewTemplatePreviewCard
        key={i}
        template={template} />
    ));
  };

  _handleTemplateFilter = (value) => {
    this.context.dispatch(
      DocumentNewActionCreators.setTemplateFilterTerms(value)
    );
  };

}
