import React, {Component, PropTypes} from 'react';
import MUITextField from 'material-ui/lib/text-field';
import Icon from './Icon';
import classNames from 'classnames';
import createNestedObject from './utils/createNestedObject';

const displayName = 'ui-Input';

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
    successKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    value: PropTypes.string,
  };

  static defaultProps = {
    autoFocus: false,
    defaultValue: '',
    disabled: false,
    patternMatches: {
      regex: /.*/,
      error: ''
    },
    type: 'text',
    width: 300
  };

  render() {
    const {
      autoComplete,
      autoFocus,
      className,
      defaultValue,
      disabled,
      error,
      label,
      labelIcon,
      type,
      width} = this.props;
    const styles = {
      width: typeof width === 'number' ? `${width}px` : width
    };
    const inputLabel = Boolean(labelIcon)
      ? <span><Icon icon={labelIcon}/>{label}</span>
      : label;

    return (
      <div className={classNames(className, displayName)} style={styles}>
        <MUITextField
          autoFocus={autoFocus}
          className={`${displayName}-input-field`}
          defaultValue={defaultValue}
          disabled={disabled}
          errorText={error}
          fullWidth={true}
          hintText={label}
          onBlur={(e) => this._submitValue(e.target.value, e)}
          onChange={(e) => this._submitValue(e.target.value, e)}
          onEnterKeyDown={this._handleEnterKeyDown}
          onFocus={(e) => this._submitValue(e.target.value, e)}
          ref='input'
          type={type}/>
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
    const value = this.props.value || this.refs['input'].getValue();
    return this.props.error === null && this._checkForError(value) === undefined;
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
  _handleEnterKeyDown = (e) => {
    const {onEnterKeyPress} = this.props;

    if (onEnterKeyPress) onEnterKeyPress();
    this._submitValue(e.target.value, e);
  };


  /**
   * Checks the input value, and submits it to the parent component, along with errors if there
   * are any.
   * @param  {String} value - The value of the input field
   * @param  {Object} e     - The event object that triggered the value submit
   */
  _submitValue = (value, e) => {
    // If the input value doesn't match the regex we passed in, we're going to trigger an error callback
    const error = this._checkForError(value) || null;
    // Updates the parent component with both the value and the error
    const nestedErrorObj = this.props.errorKeys ? createNestedObject(this.props.errorKeys, error) : null;
    const nestedValueObj = this.props.successKeys ? createNestedObject(this.props.successKeys, value) : null;

    this.props.onUpdate(value, error, nestedValueObj, nestedErrorObj, e);
  };

}