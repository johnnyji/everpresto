import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RichTextEditor from '.././shared/RichTextEditor';
import TextEditorHelper from '../.././utils/TextEditorHelper';
import Config from '../.././config/main';

const PLACEHOLDER_CLASS = Config.template.placeholderClass;

export default class TemplateEditor extends Component {

  static displayName = 'TemplateEditor';

  static propTypes = {
    className: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    templatePlaceholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired
  };

  static defaultProps = {
    templatePlaceholders: Immutable.List()
  };

  constructor(props) {
    super(props);
    this.state = {
      savedSelection: null
    };
  }

  componentDidMount() {
    const editor = findDOMNode(this);
    this._handleUpdate(this.props.text);
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

  render() {
    const {className, text} = this.props;

    return (
      <RichTextEditor
        className={className}
        text={text}
        onUpdate={this._handleUpdate}/>
    );
  }

  _handleUpdate = (htmlText = findDOMNode(this).innerHTML, rawText = findDOMNode(this).innerText) => {
    const {templatePlaceholders, onUpdate} = this.props;

    let parsedHtmlText = htmlText;
    // If we enable the ability to highlight template placeholders, we want to
    // check for new placeholders everytime the text changes
    if (templatePlaceholders.size > 0) {
      parsedHtmlText = TextEditorHelper.highlightText(htmlText, templatePlaceholders, PLACEHOLDER_CLASS);
    }

    onUpdate(parsedHtmlText, rawText);
  }

}