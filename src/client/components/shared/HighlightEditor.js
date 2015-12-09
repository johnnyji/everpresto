import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {findDOMNode} from 'react-dom';
import MediumEditor from 'medium-editor';
import classNames from 'classnames';
import replaceWordWithHtml from '../.././utils/replaceWordWithHtml';
import placeCaretAtEnd from '../.././utils/placeCaretAtEnd';

const PLACEHOLDER_TAG = 'mark';
const PLACEHOLDER_CLASS = 'template-placeholder';
const displayName = 'HighlightEditor';

export default class HighlightEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    isTemplateEditor: PropTypes.bool.isRequired,
    templatePlaceholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    isTemplateEditor: false,
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
      // If the placeholders have changed, we want to rehighlight our text
      this.setState({text: this._highlightPlaceholders(text, templatePlaceholders)});
    } else if (text !== this.state.text) {
      // If the text has changed, we want to reset the state and give that to our content editable
      this.setState({text});
    }

    if (this._updated) this._updated = false;
  }

  componentDidUpdate(prevProps, prevState) {
    placeCaretAtEnd(findDOMNode(this));
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
      parsedText = this._highlightPlaceholders(text, templatePlaceholders);
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

  _highlightPlaceholders = (text, placeholders = this.props.templatePlaceholders) => {
    return placeholders.reduce((alteredText, placeholder) => {
      return replaceWordWithHtml(alteredText, placeholder, PLACEHOLDER_TAG, PLACEHOLDER_CLASS, true);
    }, text);
  }

}