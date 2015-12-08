import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import MediumEditor from 'medium-editor';
import classNames from 'classnames';
import replaceWordWithHtml from '../.././utils/replaceWordWithHtml';

const PLACEHOLDER_TAG = 'mark';
const PLACEHOLDER_CLASS = 'template-placeholder';
const displayName = 'HighlightEditor';

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

export default class HighlightEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    isTemplateEditor: PropTypes.bool.isRequired,
    templatePlaceholders: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    isTemplateEditor: false,
    templatePlaceholders: []
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
      console.log('updated')
      this._updated = true;
      this._handleUpdate(editable.innerHTML);
    });

    // Does the initial updating.
    this._handleUpdate(componentDOM.innerHTML);
  }

  componentWillReceiveProps(nextProps) {
    console.log('props update')
    const {isTemplateEditor, templatePlaceholders, text} = nextProps;

    if (text !== this.state.text) {
      // If the placeholders have changed, we need to regenerate a highlight
      if (isTemplateEditor && templatePlaceholders.length > 0) {
        this.setState({text: this._highlightPlaceholders(text, templatePlaceholders)});
      } else {
        this.setState({text});
      }
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
        dangerouslySetInnerHTML={{__html: this.state.text}}
        style={{display: 'inline-block'}}></div>
    );
  }

  _handleUpdate = (text) => {
    const {isTemplateEditor, templatePlaceholders, onUpdate} = this.props;
    // If we enable the ability to highlight template placeholders, we want to
    // check for new placeholders everytime the text changes
    if (isTemplateEditor && templatePlaceholders.length > 0) {
      text = this._highlightPlaceholders(text, templatePlaceholders);
    }

    onUpdate(text);
  }

  _highlightPlaceholders = (text, placeholders = this.props.templatePlaceholders) => {
    return placeholders.reduce((alteredText, placeholder) => {
      return replaceWordWithHtml(text, placeholder, PLACEHOLDER_TAG, PLACEHOLDER_CLASS, true);
    }, text);
  }

}