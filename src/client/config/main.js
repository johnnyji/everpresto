const caretMarkerNodeId = 'tickit-caret-position';

export default {
  collection: {
    defaultTitle: 'Untitled',
  },
  template: {
    placeholderTag: 'mark'
  },
  richTextEditor: {
    caretMarkerNodeId,
    caretMarkerNode: `<span id="${caretMarkerNodeId}"></span>`
  }
};