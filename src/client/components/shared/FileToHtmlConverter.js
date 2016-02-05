import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import mammoth from 'mammoth';
import striptags from 'striptags';
import FileUploader from './FileUploader';
import {createFlashMessage} from '../.././actions/AppActionCreators';

const displayName = 'FileToHtmlConverter';

export default class FileToHtmlConverter extends Component {

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
    permittedExtensions: ['.docx']
  };

  render() {
    const {className, label, permittedExtensions} = this.props;
    const classes = classNames(className, displayName);
    return (
      <FileUploader
        className={classes}
        label={label}
        onUpload={this._handleUpload}
        permittedExtensions={permittedExtensions}/>
    );
  }

  /**
   * Alerts the error
   * @param  {String|React.Element} error - The error message
   */
  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  };

  /**
   * Converts the uploaded file to an HTML string
   *
   * @param  {Object} e   - The event object
   * @return {Function}   - Function for handling an error or success
   */
  _handleUpload = (file) => {
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

}