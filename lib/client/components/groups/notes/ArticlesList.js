'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ArticleItem = require('./ArticleItem');

var _ArticleItem2 = _interopRequireDefault(_ArticleItem);

var _actionsAppActions = require('../../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var ArticlesList = (function (_React$Component) {
  _inherits(ArticlesList, _React$Component);

  function ArticlesList(props) {
    _classCallCheck(this, ArticlesList);

    _get(Object.getPrototypeOf(ArticlesList.prototype), 'constructor', this).call(this, props);
  }

  _createClass(ArticlesList, [{
    key: '_toggleNewArticleModal',
    value: function _toggleNewArticleModal() {
      _actionsAppActions2['default'].toggleModal('newArticle');
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var content = undefined;

      if (p.articles) {
        content = _lodash2['default'].map(p.articles, function (article, i) {
          return _react2['default'].createElement(_ArticleItem2['default'], { article: article, key: i });
        });
      } else {
        content = _react2['default'].createElement(
          'h2',
          { className: 'placeholder-message' },
          'No article yet... Go ahead and',
          _react2['default'].createElement(
            'a',
            { onClick: this._toggleNewArticleModal },
            ' add one!'
          )
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'articles-list-wrapper' },
        content
      );
    }
  }]);

  return ArticlesList;
})(_react2['default'].Component);

exports['default'] = ArticlesList;

ArticlesList.propTypes = {
  articles: _react2['default'].PropTypes.func
};
module.exports = exports['default'];