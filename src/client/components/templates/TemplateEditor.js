import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RichTextEditor from '.././shared/RichTextEditor';
import {highlightText, removeHighlights} from '../.././utils/TextEditorHelper';

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
    
    // If the placeholders have changed, we want to re-highlight our text
    if (!templatePlaceholders.equals(this.props.templatePlaceholders)) {
      let parsedText = removeHighlights(text);
      if (templatePlaceholders.size > 0) parsedText = highlightText(parsedText, templatePlaceholders);
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
        text={text} />
    );
  }

  /**
   * Rehighlights placeholders when the user stops typing
   * @param  {String} selectionMarkedHtml - The HTML text inside the editor, with a selection marker tag
   *                                        inserted by `rangy`, so we can restore the selection after we inject
   *                                        our own HTML and replace the editor's contents
   */
  _handleStopTyping = (selectionMarkedHtml) => {
    // Updates the parent component with the newly highlighted text (with the selection marker as well)
    this._handleUpdate(
      highlightText(
        removeHighlights(selectionMarkedHtml),
        this.props.templatePlaceholders
      )
    );
  };

  /**
   * Updates the parent component with the text editor text
   * @param  {String} htmlText - The HTML text of the text editor
   */
  _handleUpdate = (htmlText = findDOMNode(this).innerHTML) => {
    this.props.onUpdate(htmlText);
  };

}
