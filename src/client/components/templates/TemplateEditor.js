import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RichTextEditor from '.././shared/RichTextEditor';
import TextEditorHelper from '../.././utils/TextEditorHelper';

const PLACEHOLDER_TAG = 'mark';
const PLACEHOLDER_CLASS = 'template-placeholder';
const displayName = 'TemplateEditor';

export default class TemplateEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    templatePlaceholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    templatePlaceholders: Immutable.List()
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.text !== findDOMNode(this).innerHTML;
  }

  componentDidMount() {
    const componentDOM = findDOMNode(this);
    const toolbarButtons = ['bold', 'italic', 'underline', 'quote', 'unorderedlist'];

    this.medium = new MediumEditor(componentDOM, {
      toolbar: {buttons: toolbarButtons}
    });

    this.medium.subscribe('editableInput', (e, editable) => {
      this._updated = true;
      this._handleUpdate(editable.innerHTML);
    });

    // Does the initial updating.
    this._handleUpdate(componentDOM.innerHTML);
  }

  componentWillReceiveProps(nextProps) {
    const {isTemplateEditor, templatePlaceholders, text} = nextProps;

    if (isTemplateEditor && !templatePlaceholders.equals(this.props.templatePlaceholders)) {
      // If the placeholders have changed, we want to re-highlight our text
      const rehighlightedText = TextEditorHelper.highlightText(
        TextEditorHelper.removeHighlights(text, this.props.templatePlaceholders, PLACEHOLDER_CLASS),
        templatePlaceholders,
        PLACEHOLDER_CLASS
      );

      this.props.onUpdate(rehighlightedText);
    } else if (text !== this.state.text) {
      // If the text has changed, we want to reset the state and give that to our content editable
      this.setState({text});
    }

    if (this._updated) this._updated = false;
  }

  componentDidUpdate(prevProps, prevState) {
    TextEditorHelper.placeCaretAtEnd(findDOMNode(this));
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const classes = classNames(this.props.className, displayName);

    return (
      <div
        className={classes}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.state.text}}></div>
    );
  }

  _handleUpdate = (text) => {
    const {isTemplateEditor, templatePlaceholders, onUpdate} = this.props;
    let parsedText = text;
    // If we enable the ability to highlight template placeholders, we want to
    // check for new placeholders everytime the text changes
    if (isTemplateEditor && templatePlaceholders.size > 0) {
      parsedText = TextEditorHelper.highlightText(text, templatePlaceholders, PLACEHOLDER_CLASS);
    }

    // TODO: When we delete a highlighted word or even a word with some style, the browser will automatically drag
    // that style on when you type something else, but in the form of inline-styling. We could write a regex tester that
    // removes it but try and find a better solution... Possible solutions? =>
    // 
    // http://www.neotericdesign.com/blog/2013/3/working-around-chrome-s-contenteditable-span-bug
    // http://stackoverflow.com/questions/19243432/prevent-contenteditable-mode-from-creating-span-tags
    // http://stackoverflow.com/questions/15015019/prevent-chrome-from-wrapping-contents-of-joined-p-with-a-span
    onUpdate(parsedText);
  }

}