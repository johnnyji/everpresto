'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TextHelper = (function () {
  function TextHelper() {
    _classCallCheck(this, TextHelper);
  }

  _createClass(TextHelper, null, [{
    key: 'truncateImageFilename',
    value: function truncateImageFilename(filename) {
      var filenamePreview = filename.substring(0, 7);
      var filenameExtension = filename.substring(filename.lastIndexOf('.') + 1);
      return filenamePreview + ' ... ' + filenameExtension;
    }
  }]);

  return TextHelper;
})();

exports['default'] = TextHelper;
module.exports = exports['default'];