import React from 'react';
import _ from 'lodash';

import ArticleItem from './ArticleItem';

import AppActions from '../../.././actions/AppActions';

export default class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
  }
  _toggleNewArticleModal() {
    AppActions.toggleModal('newArticle');
  }
  render() {
    let p = this.props;
    let content;

    if (p.articles) {
      content = _.map(p.articles, (article, i) => <ArticleItem article={article} key={i} />);
    } else {
      content = (
        <h2 className='placeholder-message'>
          No article yet... Go ahead and
          <a onClick={this._toggleNewArticleModal}> add one!</a>
        </h2>
      );
    }

    return (
      <div className='articles-list-wrapper'>
        {content}
      </div>
    );
  }
}

ArticlesList.propTypes = {
  articles: React.PropTypes.func
};