import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import rangy from 'rangy/lib/rangy-selectionsaverestore';
import classNames from 'classnames';
import MediumEditor from 'medium-editor';
import onstop from 'onstop';

const displayName = 'RichTextEditor';

export default class RichTextEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onStopTyping: PropTypes.func,
    onStopTypingTime: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    onStopTypingTime: 400
  };

  constructor(props) {
    super(props);

    this.state = {
      savedSelection: null,
      text: props.text
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.text !== findDOMNode(this).innerHTML;
  }

  componentDidMount() {
    const {onStopTyping, onStopTypingTime} = this.props;
    const editor = findDOMNode(this);

    this.medium = new MediumEditor(editor, {
      placeholder: false,
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'quote', 'unorderedlist', 'orderedlist']
      }
    });

    if (onStopTyping) {
      // No need to manually detach, will do so when the editor is destroyed in `componentWillUnmount`
      this.medium.on(editor, 'keypress', onstop(onStopTypingTime, this._handleStopTyping));
    }

    this.medium.subscribe('editableInput', (event, editable) => {
      this._updated = true;
      this._handleUpdate(editable);
    });

    // Does the initial updating.
    // TODO: Why do we need this?
    // this._handleUpdate(editor.innerHTML);
  }

  componentWillReceiveProps(nextProps) {
    const {text} = nextProps;

    if (text !== this.state.text) this.setState({text});
    if (this._updated) this._updated = false;
  }

  componentDidUpdate(prevProps) {
    const textChanged = prevProps.text.length !== this.props.text.length;

    // If the text has changed and we have a saved selection,
    // we want to restore that selection
    if (textChanged && this.state.savedSelection) {
      rangy.restoreSelection(this.state.savedSelection);
    }
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
        dangerouslySetInnerHTML={{__html: this.state.text}} />
    );
  }

  /**
   * Handles when the user stops typing (after a certain time span), marks the current selected range
   * (in most cases caret index) in the HTML, and returns the marked HTML to the parent component
   */
  _handleStopTyping = () => {
    // Once the user stops typing, we want to save their current selection (caret index in most cases)
    const savedSelection = rangy.saveSelection();
    const selectionMarkedHTML = findDOMNode(this).innerHTML;
    // Make sure we keep our saved selection in state for when we need to restore it
    this.setState({savedSelection});
    // We pass back the specially rangy marked HTML so the
    // saved selection can be later restored
    this.props.onStopTyping(selectionMarkedHTML);
  };

  /**
   * Returns the updated editor contents to the parent component
   * @param  {React.Element} ele - The Medium Text Editor contentEditable element
   */
  _handleUpdate = (ele) => {
    this.props.onUpdate(ele.innerHTML);
  };

}
