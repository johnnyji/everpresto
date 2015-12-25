import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplatePreviewCard from './TemplatePreviewCard';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import {truncateString} from '../.././utils/TextHelper';

import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import GridView from '.././ui/GridView';
import GridViewItem from '.././ui/GridViewItem';
import Spinner from '.././ui/Spinner';

const displayName = 'TemplatesIndex';

@connect((state) => ({
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  templates: state.templates.get('templates')
}))
export default class TemplatesIndex extends Component {

  static displayName = displayName;
  
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        _id: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        placeholders: ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
          })
        ).isRequired,
        rawText: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
      })
    ).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      renderView: false
    };
  }

  componentWillMount() {
    const {templates, shouldFetchTemplates} = this.props;

    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    this.setState({renderView: true});
  }

  componentWillReceiveProps(nextProps) {
    const {shouldFetchTemplates, templates} = nextProps;

    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    this.setState({renderView: true});
  }

  render() {
    return (
      <DashboardContentWrapper className={displayName}>
        {this._renderContent()}
      </DashboardContentWrapper>
    );
  }

  _handleNewTemplate = () => {
    this.context.history.push('/dashboard/templates/new');
  }

  _renderContent = () => {
    if (!this.state.renderView) return <Spinner className={`${displayName}-spinner`}/>;

    return (
      <div>
        <GridView className={`${displayName}-templates`}>
          <TemplatePreviewCard className={`${displayName}-templates-new`}>
            <button
              className={`${displayName}-templates-new-button`}
              onClick={this._handleNewTemplate}>
              <Icon icon='add' size='70'/>
            </button>
          </TemplatePreviewCard>
          {this._renderTemplatePreviews()}
        </GridView>
      </div>
    );
  };

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return <TemplatePreviewCard key={i} template={template}/>;
    });
  }

}