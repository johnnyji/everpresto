const caretMarkerNodeId = 'tickit-caret-position';

export default {
  template: {
    placeholderTag: 'mark',
    placeholderClass: 'template-placeholder'
  },
  richTextEditor: {
    caretMarkerNodeId,
    caretMarkerNode: `<span id="${caretMarkerNodeId}"></span>`
  },
};