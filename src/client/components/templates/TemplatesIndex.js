import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import GridView from '.././ui/GridView';
import GridViewItem from '.././ui/GridViewItem';
import Spinner from '.././ui/Spinner';

const displayName = 'TemplatesIndex';

@connect((state) => ({
  templates: state.templates.get('templates'),
  wasEverFetched: state.templates.get('wasEverFetched')
}))
export default class TemplatesIndex extends Component {

  static displayName = displayName;
  
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    templates: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      renderView: false
    };
  }

  componentWillMount() {
    const {templates, wasEverFetched} = this.props;

    // If there are no templates and we haven't previously fetched for them,
    // fetch the API for possible templates
    if (!wasEverFetched && templates.size === 0) {
      this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {renderView, templates} = nextProps;

    if (!renderView && templates.size > 0) this.setState({renderView: true});
  }

  render() {
    const {templates} = this.props;

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
          <GridViewItem className={`${displayName}-templates-item ${displayName}-templates-item`}>
            <button
              className={`${displayName}-templates-new-button`}
              onClick={this._handleNewTemplate}>
              <Icon icon="add" />
            </button>
          </GridViewItem>
          {this._renderTemplatePreviews()}
        </GridView>
      </div>
    );
  };

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return (
        <GridViewItem className={`${displayName}-templates-item`} key={i}>
          <h3>{template.get('title')}</h3>
        </GridViewItem>
      );
    });
  }

}
