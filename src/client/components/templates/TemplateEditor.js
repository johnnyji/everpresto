import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RichTextEditor from '.././shared/RichTextEditor';
import TextEditorHelper from '../.././utils/TextEditorHelper';

const PLACEHOLDER_CLASS = 'template-placeholder';

const handleFocus = function() {
  window.setTimeout(function() {
      var sel, range;
      if (window.getSelection && document.createRange) {
          range = document.createRange();
          range.selectNodeContents(div);
          range.collapse(true);
          sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(div);
          range.collapse(true);
          range.select();
      }
  }, 1);
}

export default class TemplateEditor extends Component {

  static displayName = 'TemplateEditor';

  static propTypes = {
    className: PropTypes.string,
    templatePlaceholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    templatePlaceholders: Immutable.List()
  };

  componentDidMount() {
    const editor = findDOMNode(this);
    this._handleUpdate(this.props.text);
    editor.addEventListener('onfocus', handleFocus)
  }

  componentWillReceiveProps(nextProps) {
    const {templatePlaceholders, text} = nextProps;

    if (!templatePlaceholders.equals(this.props.templatePlaceholders)) {
      // If the placeholders have changed, we want to re-highlight our text
      let parsedText = TextEditorHelper.removeHighlights(text, this.props.templatePlaceholders, PLACEHOLDER_CLASS);

      if (templatePlaceholders.size > 0) {
        parsedText = TextEditorHelper.highlightText(parsedText, templatePlaceholders, PLACEHOLDER_CLASS);
      }
      // Updates the parent with the rehighlighted text
      this.props.onUpdate(parsedText);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const editor = findDOMNode(this);
    editor.focus();
    // TextEditorHelper.placeCaretAtEnd(editor);
  }

  componentWillUnmount() {
    const editor = findDOMNode(this);
    editor.removeEventListener('onfocus', handleFocus);
  }

  render() {
    const {className, text} = this.props;

    return (
      <RichTextEditor
        className={className}
        text={text}
        onUpdate={this._handleUpdate}/>
    );
  }

  _handleUpdate = (htmlText, rawText) => {
    const {templatePlaceholders, onUpdate} = this.props;
    let parsedHtmlText = htmlText;
    // If we enable the ability to highlight template placeholders, we want to
    // check for new placeholders everytime the text changes
    if (templatePlaceholders.size > 0) {
      parsedHtmlText = TextEditorHelper.highlightText(htmlText, templatePlaceholders, PLACEHOLDER_CLASS);
    }

    // TODO: When we delete a highlighted word or even a word with some style, the browser will automatically drag
    // that style on when you type something else, but in the form of inline-styling. We could write a regex tester that
    // removes it but try and find a better solution... Possible solutions? =>
    // 
    // http://www.neotericdesign.com/blog/2013/3/working-around-chrome-s-contenteditable-span-bug
    // http://stackoverflow.com/questions/19243432/prevent-contenteditable-mode-from-creating-span-tags
    // http://stackoverflow.com/questions/15015019/prevent-chrome-from-wrapping-contents-of-joined-p-with-a-span
    onUpdate(parsedHtmlText, rawText);
  }

}