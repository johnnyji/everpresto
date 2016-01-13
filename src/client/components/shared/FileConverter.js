import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import mammoth from 'mammoth';
import striptags from 'striptags';
import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'FileConverter';

export default class FileConverter extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onStart: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    permittedExtensions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  static defaultProps = {
    label: 'Choose a file',
    permittedExtensions: ['.docx']
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
    const classes = classNames(className, displayName);
    return (
      <div className={classes}>
        <label className={`${displayName}-label`} htmlFor='file'>
          {this.state.filename || label}
        </label>
        <input
          className={`${displayName}-input`}
          onChange={this._handleUpload}
          type='file'/>
      </div>
    );
  }

  /**
   * Handles an error, and either invokes a specified callback or alerts a flash message
   *
   * @param  {String|React.Element} error - The error message
   * @return {Function}                   - The callback or dispatch that handles the error
   */
  _handleError = (error) => {
    const {onError} = this.props;
    const {dispatch} = this.context;

    if (onError) return onError(error);
    if (dispatch) dispatch(AppActionCreators.createFlashMessage('red', error));
  };

  /**
   * Formats the error message for an invalid file extension, and passes the
   * message off to be handled as an error.
   */
  _handleInvalidExtension = () => {
    const error = (
      <span>
        <p>Sorry, but only</p>
        {this.props.permittedExtensions.map((extension, i) => {
          return <div key={i}><b><em>{extension}</em></b></div>;
        })}
        <p>files are accepted at this time!</p>
      </span>
    );

    this._handleError(error);
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

    this.props.onStart();

    const _this = this;
    const reader = new FileReader();

    // When the upload is complete
    reader.onloadend = () => {
      // If the file reader has trouble reading a file, we alert the error
      if (reader.error) return _this._handleError(reader.error);
      // Converts the array buffer of to HTML
      mammoth.convertToHtml({arrayBuffer: reader.result})
        .then((result) => {
          _this.props.onEnd(result.value);
          _this.setState({filename: file.name});
        })
        .catch((err) => _this._handleError(err));
    };

    // Reads the user uploaded file as an array buffer
    reader.readAsArrayBuffer(file, striptags(file));
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