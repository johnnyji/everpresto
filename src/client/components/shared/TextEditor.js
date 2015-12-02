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

  static defaultProps = {
    htmlContent: ''
  };

  componentDidMount() {
    this.refs.input.focus();
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
            ref='input'>
            {htmlContent}
          </div>
        </Card>
        <Button
          className={`${displayName}-save-button`}
          onClick={this._handleSave}
          text="Save"/>
      </div>
    );
  }

  _handleSave = () => {
    this.props.onSave(this.refs.input.innerHTML);
  }

}
