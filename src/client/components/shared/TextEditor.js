import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Button from '.././ui/Button';
import Card from '.././ui/Card';

const displayName = 'TextEditor';

export default class TextEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    htmlContent: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {input} = this.refs;

    input.focus();
    input.innerHTML = this.props.htmlContent;
  }

  render() {
    const {className, htmlContent} = this.props;
    const classes = classNames(displayName, className);

    return (
      <div className={classes}>
        <Card className={`${displayName}-main`}>
          <div
            className={`${displayName}-main-input`} 
            contentEditable
            onChange={this._emitChange}
            ref='input'>
          </div>
        </Card>
        <Button
          className={`${displayName}-save-button`}
          onClick={this._handleSave}
          text="Save"/>
      </div>
    );
  }

  _emitChange = () => {
  }

  _handleSave = () => {
    const html = this.refs.input.innerHTML;
    const text = this.refs.input.innerText;

    this.props.onSave(text, html);
  }

}
