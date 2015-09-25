import React from 'react';

export default class ArticleItem extends React.Component {
  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

ArticleItem.propTypes = {
  article: React.PropTypes.object.isRequired
};