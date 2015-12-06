import rangy from 'rangy';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';
import MediumEditor from 'medium-editor';

rangy.init();

const rangyApplier = rangy.createClassApplier('document-placeholder', {
  elementTagName: 'mark',
  normalize: true
});

const HighlighterExtension = MediumEditor.extensions.button.extend({
  name: 'highlighter',
  tagNames: ['mark'],
  contentDefault: '<b>Create Placeholder Field</b>',
  contentFA: '<i class="fa fa-paint-brush"></i>',
  aria: 'Create Placeholder Field',
  action: 'highlight',

  init() {
    MediumEditor.extensions.button.prototype.init.call(this);

    this.classApplier = rangyApplier;
  },

  handleClick(e) {
    this.classApplier.toggleSelection();
  }

});

export default HighlighterExtension;