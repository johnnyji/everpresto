const caretMarkerNodeId = 'everpresto-caret-position-marker';

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