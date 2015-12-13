import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MediumEditor from 'medium-editor';

const displayName = 'RichTextEditor';

export default class RichTextEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
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
      placeholder: false,
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
    const {text} = nextProps;
    
    if (text !== this.state.text) {
      this.setState({text});
    }

    if (this._updated) this._updated = false;
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
    // const {isTemplateEditor, templatePlaceholders, onUpdate} = this.props;
    // let parsedText = text;
    // If we enable the ability to highlight template placeholders, we want to
    // check for new placeholders everytime the text changes
    // if (isTemplateEditor && templatePlaceholders.size > 0) {
    //   parsedText = TextEditorHelper.highlightText(text, templatePlaceholders, PLACEHOLDER_CLASS);
    // }

    // TODO: When we delete a highlighted word or even a word with some style, the browser will automatically drag
    // that style on when you type something else, but in the form of inline-styling. We could write a regex tester that
    // removes it but try and find a better solution... Possible solutions? =>
    // 
    // http://www.neotericdesign.com/blog/2013/3/working-around-chrome-s-contenteditable-span-bug
    // http://stackoverflow.com/questions/19243432/prevent-contenteditable-mode-from-creating-span-tags
    // http://stackoverflow.com/questions/15015019/prevent-chrome-from-wrapping-contents-of-joined-p-with-a-span
    // onUpdate(parsedText);
    this.props.onUpdate(text);
  }

}