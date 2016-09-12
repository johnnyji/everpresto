// Used for the slow migration towards CSS Modules. Constructs a custom parsing import path
export default (path) => `style!css?modules!postcss!sass!${path}`;
