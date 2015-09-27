import React from 'react';
import ReactTemplate from './ReactTemplate';
import _ from 'lodash';
import uuid from 'node-uuid';
import Dropzone from 'react-dropzone';

import Icon from './Icon';

import TextHelper from '../.././utils/TextHelper';

export default class FileUploader extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_handleFileUpload',
      '_removeUploadedFile'
    );
  }
  _handleFileUpload(selectedFiles) {
    let uploadedFiles = this.props.files;
    _.each(selectedFiles, file => {
      file.uuid = uuid.v4();
      uploadedFiles.push(file);
    });

    this.props.onUpdateFiles(uploadedFiles);
  }
  _removeUploadedFile(selectedFile) {
    let updatedFiles = _.remove(this.props.files, file => file.uuid === selectedFile.uuid);
    this.props.onUpdateFiles(updatedFiles);
  }
  render() {
    let p = this.props;
    let filePreview = <div />;

    if (p.files.length > 0) {
      let filePreviewIcons = _.map(p.files, (file, i) => {
        return (
          <li key={i} className='file-preview-item'>
            <img src={file.preview} className='file-icon'/>
            <p className='file-name'>
              {TextHelper.truncateImageFilename(file.name)}
            </p>
            <div
              className='remove-file-icon' 
              onClick={this._removeUploadedFile.bind(this, file)}>
              <Icon icon='close' />
            </div>
          </li>
        );
      });
      let filesLength = p.files.length === 1
        ? '1 file'
        : `${p.files.length} files`;

      filePreview = (
        <div className='file-preview'>
          <h4>{filesLength} uploaded</h4>
          <ul className='file-preview-list'>{filePreviewIcons}</ul>
        </div>
      );
    }

    return (
      <div className='file-uploader-wrapper'>
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
}

FileUploader.propTypes = {
  onUpdateFiles: React.PropTypes.func.isRequired,
  files: React.PropTypes.array.isRequired
};