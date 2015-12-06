import MediumEditor from 'medium-editor';
import rangy from 'rangy';

// The class applier module must also be imported in order for it be defined in the `init()` call
import 'rangy/lib/rangy-classapplier';

rangy.init();

const ACTIVE_BUTTON_CLASS = 'medium-editor-button-active';
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
    const buttonClasses = e.currentTarget.classList;

    // Toggles the `active` class on and off
    buttonClasses.contains(ACTIVE_BUTTON_CLASS)
      ? buttonClasses.remove(ACTIVE_BUTTON_CLASS)
      : buttonClasses.add(ACTIVE_BUTTON_CLASS);

    this.classApplier.toggleSelection();
  }

});

export default HighlighterExtension;