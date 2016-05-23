import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import TemplateEditor from '.././templates/TemplateEditor';
import RichTextEditor from './RichTextEditor';
import Card from '.././ui/Card';
import pureRender from 'pure-render-decorator';


const displayName = 'DocumentEditor';

@pureRender
export default class DocumentEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string.isRequired,
    className: PropTypes.string,
    isTemplateEditor: PropTypes.bool.isRequired,
    onBodyChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    templatePlaceholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    titlePlaceholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    body: '',
    isTemplateEditor: false,
    templatePlaceholders: Immutable.List(),
    title: '',
    titlePlaceholder: 'Untitled Document'
  };

  render() {
    const {
      body,
      className,
      isTemplateEditor,
      onBodyChange,
      templatePlaceholders,
      title,
      titlePlaceholder
    } = this.props;

    return (
      <Card className={classNames(className, displayName)}>
        <input
          autoFocus
          className={`${displayName}-title-input`}
          defaultValue={title}
          onChange={this._handleTitleChange}
          ref='title'
          placeholder={titlePlaceholder}
          type='text' />
        {isTemplateEditor &&
          <TemplateEditor
            className={`${displayName}-content-input`}
            onUpdate={onBodyChange}
            templatePlaceholders={templatePlaceholders}
            text={body} />
        }
        {!isTemplateEditor &&
          <RichTextEditor
            className={`${displayName}-content-input`}
            onUpdate={onBodyChange}
            text={body} />
        }
      </Card>
    );
  }

  _handleTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  };

}
