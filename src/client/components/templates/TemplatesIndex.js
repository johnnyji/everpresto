import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DocumentPreviewCard from '.././shared/DocumentPreviewCard';
import TemplatePreviewCard from './TemplatePreviewCard';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import {truncateString} from '../.././utils/TextHelper';

import DashboardSpinner from '.././shared/DashboardSpinner';
import GridView from '.././ui/GridView';

const displayName = 'TemplatesIndex';

@connect((state) => ({
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  templateBeingEdited: state.templates.get('templateBeingEdited'),
  templates: state.templates.get('templates')
}))
export default class TemplatesIndex extends Component {

  static displayName = displayName;
  
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    if (this.props.shouldFetchTemplates) {
      this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shouldFetchTemplates, templateBeingEdited, templates} = nextProps;

    if (templateBeingEdited) {
      return this.context.router.push(`/dashboard/templates/edit/${templateBeingEdited.get('_id')}`);
    }
    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
  }

  render() {
    if (this.props.shouldFetchTemplates) return <DashboardSpinner />;

    return (
      <DashboardContentWrapper className={displayName}>
        <GridView className={`${displayName}-templates`}>
          <DocumentPreviewCard
            className={`${displayName}-templates-new`}
            isNewCard={true}
            onNewIconClick={this._handleNewTemplate}/>
          {this._renderTemplatePreviews()}
        </GridView>
      </DashboardContentWrapper>
    );
  }

  _handleNewTemplate = () => {
    this.context.router.push('/dashboard/templates/new');
  }

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return <TemplatePreviewCard key={i} template={template}/>;
    });
  }

}