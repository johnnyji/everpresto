const truncateImageFilename = (filename) => {
  const filenamePreview = filename.substring(0, 7);
  const filenameExtension = filename.substring(filename.lastIndexOf('.') + 1);
  return `${filenamePreview} ... ${filenameExtension}`;
};

const truncateString = (string, length) => {
  if (string.length > length) return `${string.substring(0, length)}...`;
  return string;
};

export default {truncateImageFilename, truncateString};