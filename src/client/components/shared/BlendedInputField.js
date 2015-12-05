import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'BlendedInputField';

export default class BlendedInputField extends Component {

  static displayName = displayName;

  static propTypes = {
    isTextArea: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isTextArea: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {className, isTextArea} = this.props;
    const classes = classNames('blended-input-field', className);
    let field;

    if (isTextArea) {
      field = (
        <textarea
          {...this.props}
          className={classes}
        ></textarea>
      );
    } else {
      field = (
        <input 
          {...this.props}
          className={classes}
        ></input>
      );
    }

    return field;
  }
}