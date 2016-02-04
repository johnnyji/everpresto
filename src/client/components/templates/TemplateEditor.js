import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RichTextEditor from '.././shared/RichTextEditor';
import {highlightText, removeHighlights} from '../.././utils/TextEditorHelper';
import Config from '../.././config/main';

/**
 * This component takes care of scanning and highlighting the text for placeholders every time the
 * user stops typing or `templatePlaceholders` prop updates
 */
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

  componentWillReceiveProps(nextProps) {
    const {templatePlaceholders, text} = nextProps;

    if (!templatePlaceholders.equals(this.props.templatePlaceholders)) {
      // If the placeholders have changed, we want to re-highlight our text
      let parsedText = removeHighlights(text);

      if (templatePlaceholders.size > 0) {
        parsedText = highlightText(parsedText, templatePlaceholders);
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
        onStopTyping={this._handleStopTyping}
        onUpdate={this._handleUpdate}
        text={text}/>
    );
  }

  /**
   * Rehighlights the placeholders when the user stops typing and triggers an update
   */
  _handleStopTyping = () => {
    const {text, templatePlaceholders} = this.props;
    this._handleUpdate(
      highlightText(removeHighlights(text), templatePlaceholders)
    );
  };


  _handleUpdate = (htmlText = findDOMNode(this).innerHTML) => {
    this.props.onUpdate(htmlText);
  };

}