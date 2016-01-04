import moment from 'moment';

const TextHelper = {

  truncateString(string, length) {
    if (string.length > length) return `${string.substring(0, length)}...`;
    return string;
  },

  truncateImageFilename(filename) {
    const filenamePreview = filename.substring(0, 7);
    const filenameExtension = filename.substring(filename.lastIndexOf('.') + 1);
    return `${filenamePreview} ... ${filenameExtension}`;
  }

}

export default TextHelper;