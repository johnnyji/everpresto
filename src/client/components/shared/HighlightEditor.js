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
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    toolbarOptions: {
      buttons: [
        'bold',
        'italic',
        'underline',
        'anchor',
        'quote',
        'highlighter'
      ],
      targetBlank: true
    }
  }

  state = {
    text: this.props.text
  };

  componentDidMount() {
    const componentDOM = findDOMNode(this);

    this.medium = new MediumEditor(componentDOM, {
      toolbar: this.props.toolbarOptions,
      extensions: {
        'highlighter': new HighlighterExtension()
      }
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
    this.props.onUpdate(text);
  }

}