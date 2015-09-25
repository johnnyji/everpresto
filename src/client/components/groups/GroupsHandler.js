import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';
import { Link } from 'react-router';
import ProtectedComponent from '.././shared/ProtectedComponent';

import AppActions from '../.././actions/AppActions';
import ProjectActions from '../.././actions/ProjectActions';
import ProjectStore from '../.././stores/ProjectStore';

import ArticlesList from './articles/ArticlesList';

import Icon from '.././shared/Icon';
import SearchBar from '.././shared/SearchBar';

class GroupsHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_updateState',
      '_changeActiveTabIndex',
      '_searchArticles',
      '_toggleNewArticleModal'
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
  _searchArticles(searchTerms) {
    console.log('search hit: ', searchTerms);
  }
  _toggleNewArticleModal(e) {
    AppActions.toggleModal('newArticle');
  }
  render() {
    let s = this.state;
    let p = this.props;

    return (
      <div className='groups-wrapper'>
        <header>
          <div className='new-article'>
            <a onClick={this._toggleNewArticleModal}>
              <Icon icon='add'/> New Article
            </a>
          </div>

          <SearchBar onInputChange={this._searchArticles}/>

        </header>
        <ArticlesList articles={this.props.articles} />
      </div>
    );
  }
}

GroupsHandler.defaultProps = {
  navTabs: ['Active', 'Archived']
};

export default ProtectedComponent(GroupsHandler);