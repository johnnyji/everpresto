import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';
import { Link } from 'react-router';
import ProtectedComponent from '.././shared/ProtectedComponent';

import ProjectActions from '../.././actions/ProjectActions';
import ProjectStore from '../.././stores/ProjectStore';

import EmployerProjectsList from './projects/EmployerProjectsList';

import Icon from '.././shared/Icon';

class ProjectsHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_updateState',
      '_changeActiveTabIndex',
      '_showNewProjectModal'
    );
  }
  componentDidMount() {
    this._unsubscribe = ProjectStore.listen(this._updateState);
  }
  componentWillUnmount() {
    this._unsubscribe(); 
  }
  _getInitialState() {
    let state = ProjectStore.getState();
    return {
      projects: state.projects,
      activeTabIndex: state.activeTabIndex
    };
  }
  _updateState(state) {
    this.setState({
      projects: state.projects,
      activeTabIndex: state.activeTabIndex
    });
  }
  _changeActiveTabIndex(e) {
    ProjectActions.changeActiveTabIndex(e.target.value);
  }
  _showNewProjectModal() {

  }
  render() {
    let s = this.state;
    let p = this.props;
    let navTabs = _.map(p.navTabs, (tab, i) => {
      if (i === s.activeTabIndex) return <li key={i} className='active-tab'>{tab}</li>;
      return <li key={i} value={i} onClick={this._changeActiveTabIndex}>{tab}</li>;
    });
    let content = [
      <EmployerProjectsList projects={this.state.projects.archived} />,
      <EmployerProjectsList archive={true} projects={this.state.projects.archived} />
    ];

    return (
      <div className='projects-wrapper'>
        <header>
          <div className='new-project'>
            <button onClick={this._showNewProjectModal}>
              <Icon icon='add'/> New Project
            </button>
          </div>
          <ul className='sub-nav'>{navTabs}</ul>
        </header>
        {content[s.activeTabIndex]}
      </div>
    );
  }
}

ProjectsHandler.defaultProps = {
  navTabs: ['Active', 'Archived']
};

export default ProtectedComponent(ProjectsHandler);