import React, {Component, PropTypes} from 'react';
import MUITextField from 'material-ui/TextField';
import Icon from './Icon';
import classNames from 'classnames';
import createNestedObject from './utils/createNestedObject';

const displayName = 'ui-Input';
// Key code for the Enter key
const ENTER = 13;

export default class Input extends Component {

  static displayName = displayName;

  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    displayErrorOn: PropTypes.oneOf(['change', 'blur']).isRequired,
    error: PropTypes.string,
    errorKeys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    forceDisplayError: PropTypes.bool.isRequired,
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
    value: PropTypes.string.isRequired,
    width: PropTypes.number
  };

  static defaultProps = {
    autoFocus: false,
    disabled: false,
    displayErrorOn: 'blur',
    forceDisplayError: false,
    patternMatches: {
      regex: /.*/,
      error: ''
    },
    type: 'text'
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldDisplayError: false
    };
  }

  // Right when the component mounts, we submit the value and errors back to the parent so that
  // any possible errors are tracked from the get go, just in case the user tries to hit a submit
  // button before even typing into the input field.
  componentDidMount() {
    this._submitValue({target: this.props.value});
  }

  render() {
    const {
      autoFocus,
      className,
      disabled,
      label,
      labelIcon,
      type,
      value,
      width
    } = this.props;
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
          disabled={disabled}
          errorText={this._renderErrorText()}
          fullWidth={true}
          hintText={inputLabel}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
          onFocus={this._handleFocus}
          ref='input'
          type={type}
          value={value} />
      </div>
    );
  }

  /**
   * Forces the `onUpdate` prop to be triggered. This is useful for when you need the latest and
   * most accurate error/value
   */
  forceUpdate = () => {
    this._submitValue({target: this.props.value});
  }

  /**
   * Returns whether or not the input field value is valid
   * @return {Boolean} - The validity of the field
   */
  valid = () => {
    return this.props.error === null && this._checkForError(this.props.value) === undefined;
  };

  _renderErrorText = () => {
    const {error, forceDisplayError} = this.props;
    const {shouldDislayError} = this.state;

    // No error
    if (!error) return undefined;
    // Error and we need to display it
    if (forceDisplayError || shouldDislayError) return error;
    // Error but no need to display it
    return undefined;
  };

  /**
   * Checks it's provided value against the input field's `patternMatches` prop
   * and returns either an error or undefined
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
    }

    // Checks the validity of the value against the pattern, and returns an error if no match
    return patternMatches.regex.test(value) ? undefined : patternMatches.error;
  };

  /**
   * Checks to see if potential errors should be displayed and submits the input value every time the input blurs
   * @param  {Object} e - The blur event object
   */
  _handleBlur = (e) => {
    if (this.props.displayErrorOn === 'blur') this.setState({shouldDislayError: true});
    this._submitValue(e);
  };

  /**
   * Checks to see if potential errors should be displayed and submits the input value every time the value changes
   * @param  {Object} e - The change event object
   */
  _handleChange = (e) => {
    if (this.props.displayErrorOn === 'change') this.setState({shouldDislayError: true});
    this._submitValue(e);
  };

  /**
   * Forbids the input field from showing any errors and updates the parent component with it's value
   * @param  {Object} e - The focus event object
   */
  _handleFocus = (e) => {
    this.setState({shouldDislayError: false});
    this._submitValue(e);
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

    // Only if `successKeys` and `errorKeys` are provided will the input field go through the trouble of
    // building up the nested object based on those keys, otherwise it just passes back null
    const nestedErrorObj = this.props.errorKeys ? createNestedObject(this.props.errorKeys, error) : null;
    const nestedValueObj = this.props.successKeys ? createNestedObject(this.props.successKeys, value) : null;

    // Updates the parent component with both the value and the error
    this.props.onUpdate(value, error, nestedValueObj, nestedErrorObj, e);
  };

}
