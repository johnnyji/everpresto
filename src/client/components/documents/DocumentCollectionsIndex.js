import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';

import Button from '.././ui/Button';
import ClickableIcon from '.././ui/ClickableIcon';
import FolderCard from '.././ui/FolderCard';
// import GridView from '.././ui/GridView';
// import GridViewItem from '.././ui/GridViewItem';
import Spinner from '.././ui/Spinner';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardMessage from '.././dashboard/DashboardMessage';

import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'DocumentCollectionsIndex';

@connect((state) => ({
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  templates: state.templates.get('templates')
}))
export default class DocumentCollectionsIndex extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      renderView: false
    }
  }

  componentWillMount() {
    // Fetches the templates if needed, otherwise if the templates are already fetched, render the view.
    if (this.props.shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    this.setState({renderView: true});
  }

  componentWillReceiveProps(nextProps) {
    // Fetches the templates and sets render view to true only if needed.
    if (nextProps.shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    if (!this.state.renderView) this.setState({renderView: true});
  }

  render() {
    const {shouldFetchTemplates, templates} = this.props;

    if (shouldFetchTemplates) return <Spinner />;

    if (!shouldFetchTemplates && templates.size === 0) return this._renderCreateTemplateMessage();

    return (
      <DashboardContentWrapper className={displayName}>
        <FolderCard className={`${displayName}-folder`} height={100} width={150}>
          <ClickableIcon
            className={`${displayName}-folder-create-icon`}
            icon='add'
            isWhite={true}
            onClick={() => console.log('hit')}
            size={32}/>
        </FolderCard>
      </DashboardContentWrapper>
    );
  }

  _renderCreateTemplateMessage = () => {
    return (
      <DashboardContentWrapper className={displayName}>
        <DashboardMessage className={`${displayName}-create-template`}>
          <span className={`${displayName}-create-template-message`}>
            Looks like you don't have any templates yet. Create one first so you can start sending documents for people to sign!
          </span>
          <Button
            className={`${displayName}-create-template-button`}
            color='green'
            onClick={this._navigateNewTemplateView}
            text='Create a Template!' />
        </DashboardMessage>
      </DashboardContentWrapper>
    );
  }

  _navigateNewTemplateView = () => {
    this.context.history.push('/dashboard/templates/new');
  }

}