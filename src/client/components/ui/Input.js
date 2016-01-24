import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import createNestedObject from './utils/createNestedObject';

const ENTER_KEY = 13;
const className = 'ui-Input';

export default class Input extends Component {

  static displayName = 'Input';

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
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    liveError: PropTypes.bool.isRequired,
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
    showError: PropTypes.bool.isRequired,
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
    liveError: false,
    patternMatches: {
      regex: /.*/,
      error: ''
    },
    showError: true,
    type: 'text'
  };

  constructor (props) {
    super(props);
    this.state = {
      focused: false,
      showLabel: true
    };
  };

  componentWillMount() {
    if (Boolean(this.props.defaultValue)) {
      this.setState({showLabel: false});
    }  
  }

  render() {
    const classes = classNames(this.props.className, className);

    return (
      <div className={classes}>
        {this.state.showLabel &&
          <label className={`${className}-label`}>
            {this.props.label}
          </label>
        }
        <input
          autoFocus={this.props.autoFocus}
          className={`${className}-input-field`}
          defaultValue={this.props.defaultValue}
          disabled={this.props.disabled}
          label={this.props.label}
          onBlur={this._handleBlur}
          onChange={this._handleChange}
          onFocus={this._handleFocus}
          onKeyPress={this._handleKeyPress}
          ref='input'
          type={this.props.type}/>
          {this.props.showError && this._renderError()}
      </div>
    );

  }

  /**
   * Sets the input field back to it's original state
   */
  clear = () => {
    this.refs['input'].value = '';
    this.setState({showLabel: true});
  };

  /**
   * Returns whether or not the input field value is valid
   * 
   * @return {Boolean} - The validity of the field
   */
  valid = () => {
    const value = this.props.value || this.refs['input'].value;
    return this.props.error === null && this._checkForError(value) === undefined;
  };


  /**
   * Returns the error value of the input
   * 
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
    return this.props.value || this.refs.input.value;
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
  }


  /**
   * Handles the blur event
   *
   * @param  {Object} e - The event object
   */
  _handleBlur = (e) => {
    // Sets `focused` state to false so input errors will show if there is any
    this.setState({focused: false});
    this._submitValue(e.target.value, e);
  }


  /**
   * Handles the change event of the input field
   *
   * @param  {Object} e - The event object
   */
  _handleChange = (e) => {
    const value = e.target.value;
    this.setState({showLabel: Boolean(value === '')});
    this._submitValue(value, e);
  }


  /**
   * When the input field focuses, we set the state so errors dissapear. We also want to issue to
   * submit the value on focus so we can get an error for the input field ASAP.
   * 
   * This is useful because if we auto focus an input field on every form mount, we'll always have
   * at least one present error if the user tries to submit immediately.
   *
   * @param  {Object} e - The event object
   */
  _handleFocus = (e) => {
    this.setState({focused: true});
    this._submitValue(e.target.value, e);
  }

  /**
   * Submits the input field value if the key pressed is `Enter`
   *
   * @param  {Object} e - The event object
   */
  _handleKeyPress = (e) => {
    if (e.which === ENTER_KEY) {
      const {onEnterKeyPress} = this.props;

      if (onEnterKeyPress) onEnterKeyPress();
      this._submitValue(e.target.value, e);
    }
  }


  /**
   * Returns an error message on the input field for the user
   *
   * @return {React.Element|Undefined} - The error message to be rendered
   */
  _renderError = () => {
    const {error, liveError} = this.props;
    // If there's no error, we don't return anything
    if (!Boolean(error)) return;
    // If the `liveError` prop is true, we return error as long as there is one
    if (liveError) {
      return (
        <small className={`${className}-error`}>
          {this.props.error}
        </small>
      );
    }
    // If the `liveError` prop is not true, we only return an error when we're not focused
    if (!this.state.focused) {
      return (
        <small className={`${className}-error`}>
          {this.props.error}
        </small>
      );
    }
  }


  /**
   * Checks the input value, and submits it to the parent component, along with errors if there
   * are any
   * 
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
  }

}