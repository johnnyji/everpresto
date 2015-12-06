import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import MediumEditor from 'medium-editor';
import classNames from 'classnames';
import HighlighterExtension from '../.././utils/HighlighterExtension';

const displayName = 'HighlightEditor';

export default class HighlightEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    isTemplateEditor: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    isTemplateEditor: false
  }

  state = {
    text: this.props.text
  };

  componentDidMount() {
    const componentDOM = findDOMNode(this);
    const toolbarButtons = ['bold', 'italic', 'underline', 'quote', 'unorderedlist'];

    // Adds the highlighter component to the toolbar if we're editing a template
    if (this.props.isTemplateEditor) toolbarButtons.push('highlighter');

    this.medium = new MediumEditor(componentDOM, {
      toolbar: {
        buttons: toolbarButtons
      },
      extensions: {'highlighter': new HighlighterExtension()}
    });

    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this._handleUpdate(componentDOM.innerHTML);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.text !== this.state.text && !this._updated) {
      this.setState({text: nextProps.text});
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
        dangerouslySetInnerHTML={{__html: this.state.text}}/>
    );
  }

  _handleUpdate = (text) => {
    const {isTemplateEditor, onUpdate} = this.props;
    onUpdate(text);
  }

}