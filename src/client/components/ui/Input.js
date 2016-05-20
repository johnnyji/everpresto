import React, {Component, PropTypes} from 'react';
import MUITextField from 'material-ui/TextField';
import Icon from './Icon';
import classNames from 'classnames';
import createNestedObject from './utils/createNestedObject';

const displayName = 'ui-Input';
const ENTER = 13;

export default class Input extends Component {

  static displayName = displayName;

  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    className: PropTypes.string,
    defaultValue: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    error: PropTypes.string,
    errorKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    label: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    labelIcon: PropTypes.string,
    onEnterKeyPress: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    patternMatches: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          error: PropTypes.string.isRequired,
          regex: PropTypes.instanceOf(RegExp).isRequired
        }).isRequired
      ),
      PropTypes.shape({
        error: PropTypes.string.isRequired,
        regex: PropTypes.instanceOf(RegExp).isRequired
      })
    ]).isRequired,
    shouldDisplayError: PropTypes.bool.isRequired,
    successKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    value: PropTypes.string,
    width: PropTypes.number
  };

  static defaultProps = {
    autoFocus: false,
    defaultValue: '',
    disabled: false,
    patternMatches: {
      regex: /.*/,
      error: ''
    },
    shouldDisplayError: true,
    type: 'text'
  };

  render() {
    const {
      autoFocus,
      className,
      defaultValue,
      disabled,
      error,
      label,
      labelIcon,
      shouldDisplayError,
      type,
      width} = this.props;
    const styles = {
      width: width != null ? `${width}px` : '100%'
    };
    const inputLabel = labelIcon
      ? <span><Icon icon={labelIcon} />{label}</span>
      : label;

    return (
      <div className={classNames(className, displayName)} style={styles}>
        <MUITextField
          autoFocus={autoFocus}
          className={`${displayName}-input-field`}
          defaultValue={defaultValue}
          disabled={disabled}
          errorText={shouldDisplayError ? error : undefined}
          fullWidth={true}
          hintText={inputLabel}
          onBlur={this._submitValue}
          onChange={this._submitValue}
          onKeyDown={this._handleKeyDown}
          onFocus={this._submitValue}
          ref='input'
          type={type} />
      </div>
    );
  }

  /**
   * Sets the input field back to it's original state
   */
  clear = () => {
    this.refs['input'].clearValue();
  };

  /**
   * Returns whether or not the input field value is valid
   *
   * @return {Boolean} - The validity of the field
   */
  valid = () => {
    return this.props.error === null && this._checkForError(this.getValue()) === undefined;
  };


  /**
   * Returns the error value of the input
   * @return {String|Null} - The error if one exists
   */
  getError = () => {
    return this.props.error;
  };


  /**
   * Called by parent component, retrieves the current value of the input field
   *
   * @return {String} - The value of the input field
   */
  getValue = () => {
    return this.props.value || this.refs['input'].getValue();
  };


  /**
   * Checks it's provided value against the input field's `patternMatches` prop
   * and returns either an error or undefined
   * 
   * @param  {String} value - The value that we're validating
   * @return {String|Undefined} - The error string in `patternMatches` or undefined
   */
  _checkForError = (value) => {
    const {patternMatches} = this.props;

    if (Array.isArray(patternMatches)) {
      // Goes through all the regex patterns and returns the first the error of the
      // first pattern that the value doesn't match
      const errorMatch = patternMatches.find((pattern) => {
        if (!pattern.regex.test(value)) return pattern.error;
      });
      return errorMatch === undefined ? undefined : errorMatch.error;
    } else {
      // Checks the validity of the value against the pattern, and returns an error if no match
      return patternMatches.regex.test(value) ? undefined : patternMatches.error;
    }
  };

    
  /**
   * Handles when the enter key is pressed
   * @param  {Object} e - The enter key press event
   */
  _handleKeyDown = (e) => {
    if (e.which === ENTER) {
      const {onEnterKeyPress} = this.props;

      if (onEnterKeyPress) onEnterKeyPress();
      this._submitValue(e);
    }
  };


  /**
   * Checks the input value, and submits it to the parent component, along with errors if there
   * are any.
   * @param  {Object} e     - The event object that triggered the value submit
   */
  _submitValue = (e) => {
    const {value} = e.target;
    // If the input value doesn't match the regex we passed in, we're going to trigger an error callback
    const error = this._checkForError(value) || null;
    // Updates the parent component with both the value and the error
    const nestedErrorObj = this.props.errorKeys ? createNestedObject(this.props.errorKeys, error) : null;
    const nestedValueObj = this.props.successKeys ? createNestedObject(this.props.successKeys, value) : null;

    this.props.onUpdate(value, error, nestedValueObj, nestedErrorObj, e);
  };

}
