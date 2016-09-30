import React, {PureComponent, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RichTextEditor, {HighlightEditor as HighlightDecorator} from 'ui-components/src/RichTextEditor';

const Editor = HighlightDecorator(RichTextEditor);

export default class HighlightEditor extends PureComponent {

  static displayName = 'HighlightEditor';

  static propTypes = {
    className: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    placeholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired
  };

  render() {
    const {className, onUpdate, placeholders} = this.props;

    return (
      <Editor
        className={className}
        highlightWords={placeholders}
        onUpdate={onUpdate} />
    );
  }

}

