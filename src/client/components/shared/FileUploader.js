import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ClickableIcon from '.././ui/ClickableIcon';
import AppActionCreators from '../.././actions/AppActionCreators';
import handleFlashError from '../.././decorators/handleFlashError';

const displayName = 'FileUploader';

@handleFlashError
export default class FileUploader extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    handleFlashError: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onReset: PropTypes.func,
    onUpload: PropTypes.func.isRequired,
    permittedExtensions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  static defaultProps = {
    label: 'Choose a file'
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Only update the component when the selected file's name will be different
    return nextState.filename !== this.state.filename;
  }

  constructor() {
    super();
    this.state = {
      filename: null
    };
  }

  render() {
    const {className, label} = this.props;
    const {filename} = this.state;
    const classes = classNames(className, displayName);
    return (
      <div className={classes}>
        <label className={`${displayName}-label`} htmlFor='file'>
          {filename || label}
        </label>
        <input
          className={`${displayName}-input`}
          onChange={this._handleUpload}
          ref='input'
          type='file'/>
        {filename &&
          <ClickableIcon
            className={`${displayName}-reset-icon`}
            icon='close'
            onClick={this._resetInput}/>
        }
      </div>
    );
  }

  /**
   * Formats the error message for an invalid file extension, and passes the
   * message off to be handled as an error.
   */
  _handleInvalidExtension = () => {
    const error = (
      <span>
        <p>Try one of the following extensions</p>
        {this.props.permittedExtensions.map((extension, i) => {
          return (
            <div key={i}>
              <b><em>{extension}</em></b>
              <br/><br/>
            </div>
          );
        })}
      </span>
    );

    this.props.handleFlashError(error);
  };

  /**
   * Handles when the user uploads a file. Either returns an error or transforms the file to an HTML string,
   * and returns the parsed file.
   *
   * @param  {Object} e   - The event object
   * @return {Function}   - Function for handling an error or success
   */
  _handleUpload = (e) => {
    const file = e.target.files[0];

    // If the file uploaded is not a permitted format, we alert an error
    if (!this._validateExtension(file.name)) return this._handleInvalidExtension();
    this.setState({filename: file.name});
    this.props.onUpload(file);
  };


  /**
   * Resets the file upload input field
   */
  _resetInput = () => {
    const {onReset} = this.props;

    this.refs['input'].value = '';
    this.setState({filename: null});

    if (onReset) onReset();
  };


  /**
   * Validates if the extension of the filename to see if this certain file format is permitted
   *
   * @param  {String} filename  - The name of the file being validated
   * @return {Boolean}          - Whether or not the file extension is permitted
   */
  _validateExtension = (filename) => {
    const filenameExt = filename.substring(filename.lastIndexOf('.'));
    const matched = this.props.permittedExtensions.find((ext) => ext === filenameExt);
    return Boolean(matched);
  };

}