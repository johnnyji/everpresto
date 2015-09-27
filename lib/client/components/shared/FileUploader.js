'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTemplate2 = require('./ReactTemplate');

var _ReactTemplate3 = _interopRequireDefault(_ReactTemplate2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _utilsTextHelper = require('../.././utils/TextHelper');

var _utilsTextHelper2 = _interopRequireDefault(_utilsTextHelper);

var FileUploader = (function (_ReactTemplate) {
  _inherits(FileUploader, _ReactTemplate);

  function FileUploader(props) {
    _classCallCheck(this, FileUploader);

    _get(Object.getPrototypeOf(FileUploader.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_handleFileUpload', '_removeUploadedFile');
  }

  _createClass(FileUploader, [{
    key: '_handleFileUpload',
    value: function _handleFileUpload(selectedFiles) {
      var uploadedFiles = this.props.files;
      _lodash2['default'].each(selectedFiles, function (file) {
        file.uuid = _nodeUuid2['default'].v4();
        uploadedFiles.push(file);
      });

      this.props.onUpdateFiles(uploadedFiles);
    }
  }, {
    key: '_removeUploadedFile',
    value: function _removeUploadedFile(selectedFile) {
      var updatedFiles = _lodash2['default'].remove(this.props.files, function (file) {
        return file.uuid === selectedFile.uuid;
      });
      this.props.onUpdateFiles(updatedFiles);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var p = this.props;
      var filePreview = _react2['default'].createElement('div', null);

      if (p.files.length > 0) {
        var filePreviewIcons = _lodash2['default'].map(p.files, function (file, i) {
          return _react2['default'].createElement(
            'li',
            { key: i, className: 'file-preview-item' },
            _react2['default'].createElement('img', { src: file.preview, className: 'file-icon' }),
            _react2['default'].createElement(
              'p',
              { className: 'file-name' },
              _utilsTextHelper2['default'].truncateImageFilename(file.name)
            ),
            _react2['default'].createElement(
              'div',
              {
                className: 'remove-file-icon',
                onClick: _this._removeUploadedFile.bind(_this, file) },
              _react2['default'].createElement(_Icon2['default'], { icon: 'close' })
            )
          );
        });
        var filesLength = p.files.length === 1 ? '1 file' : p.files.length + ' files';

        filePreview = _react2['default'].createElement(
          'div',
          { className: 'file-preview' },
          _react2['default'].createElement(
            'h4',
            null,
            filesLength,
            ' uploaded'
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'file-preview-list' },
            filePreviewIcons
          )
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'file-uploader-wrapper' },
        _react2['default'].createElement(
          _reactDropzone2['default'],
          {
            className: 'dropzone',
            onDrop: this._handleFileUpload,
            multiple: true },
          _react2['default'].createElement(
            'p',
            null,
            'Drag files here or click to upload'
          )
        ),
        filePreview
      );
    }
  }]);

  return FileUploader;
})(_ReactTemplate3['default']);

exports['default'] = FileUploader;

FileUploader.propTypes = {
  onUpdateFiles: _react2['default'].PropTypes.func.isRequired,
  files: _react2['default'].PropTypes.array.isRequired
};
module.exports = exports['default'];