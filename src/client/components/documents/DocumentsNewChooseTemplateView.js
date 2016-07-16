import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardQuote from '.././dashboard/DashboardQuote';
import RequiresTemplates from '../../containers/RequiresTemplates';
import TemplateCardPreviewSelect from '.././templates/TemplateCardPreviewSelect';
import SearchBar from '.././ui/SearchBar';

import AppActionCreators from '../.././actions/AppActionCreators';
import ModalDocumentPreview from '.././modals/ModalDocumentPreview';

const displayName = 'DocumentsNewChooseTemplateView';

@RequiresTemplates
export default class DocumentsNewChooseTemplateView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    onTemplateChoose: PropTypes.func.isRequired,
    onTemplateFilter: PropTypes.func.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  static defaultProps = {
    templates: Immutable.List()
  };

  render() {
    const {onTemplateFilter, templates} = this.props;

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
            onUpdate={onTemplateFilter} />
        </DashboardContentHeader>
          {templates.size > 0 &&
            <div className={`${displayName}-templates`}>
              {this._renderTemplatePreviewCards()}
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

  _renderTemplatePreviewCards = () => {
    const {onTemplateChoose, templates} = this.props;

    return templates.map((template, i) => (
      <TemplateCardPreviewSelect
        key={i}
        onSelect={() => onTemplateChoose(template)}
        onPreview={() => this._handlePreviewTemplate(template)}
        template={template} />
    ));
  };

  _handlePreviewTemplate = (template) => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalDocumentPreview
          body={template.get('body')}
          title={template.get('title')}/>
      )
    );
  };

}