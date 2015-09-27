export default class TextHelper {
  static truncateImageFilename(filename) {
    let filenamePreview = filename.substring(0, 7);
    let filenameExtension = filename.substring(filename.lastIndexOf('.') + 1);
    return `${filenamePreview} ... ${filenameExtension}`;
  }
}