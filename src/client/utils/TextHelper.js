const TextHelper = {
  truncateImageFilename(filename) {
    const filenamePreview = filename.substring(0, 7);
    const filenameExtension = filename.substring(filename.lastIndexOf('.') + 1);
    return `${filenamePreview} ... ${filenameExtension}`;
  }
}

export default TextHelper;