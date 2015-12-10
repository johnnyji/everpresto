import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import uuid from 'node-uuid';
import Dropzone from 'react-dropzone';
import Icon from '.././ui/Icon';

import TextHelper from '../.././utils/TextHelper';

export default class FileUploader extends Component {

  static propTypes = {
    files: React.PropTypes.arrayOf(PropTypes.string).isRequired,
    onUpdateFiles: React.PropTypes.func.isRequired,
    uploaderClassName: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    // clears the uploaded files when the component is about to unmount
    this.props.onUpdateFiles([]);
  }

  render () {
    const fileUploaderClasses = classNames(
      'file-uploader',
      this.props.uploaderClassName
    );
    let filePreview = <div />;

    if (this.props.files.length > 0) {
      const filePreviewIcons = _.map(p.files, (file, i) => {
        return (
          <li key={i} className='file-uploader-preview-list-item'>
            <img src={file.preview} className='file-uploader-preview-list-item-icon'/>
            <p className='file-uploader-preview-list-item-name'>
              {TextHelper.truncateImageFilename(file.name)}
            </p>
            <button
              className='file-uploader-preview-list-item-remove-file-icon'
              onClick={() => this._removeUploadedFile(file)}>
              <Icon icon='close' />
            </button>
          </li>
        );
      });

      const filesLength = this.props.files.length === 1
        ? '1 file'
        : `${this.props.files.length} files`;

      filePreview = (
        <div className='file-uploader-preview'>
          <h4 className='file-uploader-preview-title'>{filesLength} uploaded</h4>
          <ul className='file-uploader-preview-list'>{filePreviewIcons}</ul>
        </div>
      );
    }

    return (
      <div className={fileUploaderClasses}>
        <Dropzone
          className='dropzone'
          onDrop={this._handleFileUpload}
          multiple={true}>
          <p>Drag files here or click to upload</p>
        </Dropzone>
        {filePreview}
      </div>
    );
  }

  _handleFileUpload = (selectedFiles) => {
    let uploadedFiles = this.props.files;
    _.each(selectedFiles, (file) => {
      file.uuid = uuid.v4();
      uploadedFiles.push(file);
    });

    this.props.onUpdateFiles(uploadedFiles);
  }

  _removeUploadedFile = (selectedFile) => {
    _.remove(this.props.files, (file) => file.uuid === selectedFile.uuid);
    this.props.onUpdateFiles(this.props.files);
  }

}