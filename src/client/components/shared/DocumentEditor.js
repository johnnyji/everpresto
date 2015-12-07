import React, {Component, PropTypes} from 'react';
import ReactQuill, {Toolbar} from 'react-quill';
import classNames from 'classnames';
import HighlightEditor from '.././shared/HighlightEditor';
import Button from '.././ui/Button';
import Card from '.././ui/Card';

const displayName = 'DocumentEditor';

export default class DocumentEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string.isRequired,
    className: PropTypes.string,
    highlightable: PropTypes.bool.isRequired,
    isTemplateEditor: PropTypes.bool.isRequired,
    onBodyChange: PropTypes.func.isRequired,
    onHighlight: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    titlePlaceholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    body: '',
    highlightable: true,
    isTemplateEditor: false,
    title: '',
    titlePlaceholder: 'Untitled Document',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {body, className, isTemplateEditor, onBodyChange, title, titlePlaceholder} = this.props;
    const classes = classNames(className, displayName);

    return (
      <Card className={classes}>
        <input
          autoFocus
          className={`${displayName}-title-input`}
          defaultValue={title}
          ref='title'
          placeholder={titlePlaceholder}
          type='text'/>
        <HighlightEditor
          className={`${displayName}-content-input`}
          isTemplateEditor={isTemplateEditor}
          onUpdate={onBodyChange}
          text={body}/>
        {/*<ReactQuill
          className={`${displayName}-main`}
          onChange={this._handleBodyChange}
          onChangeSelection={this._handleTextHighlight}
          ref='quill'
          theme='snow'>
          <Toolbar
            items={customToolbarItems}
            key='toolbar'
            ref='toolbar'
            theme='snow'/>
          <Button
            className={`${displayName}-main-create-placeholder-button`}
            disabled={!this.state.yolo}
            onClick={() => {}}
            text='Create Placeholder'/>
          <input
            autoFocus
            className={`${displayName}-main-title-input`}
            defaultValue={title}
            ref='title'
            placeholder={titlePlaceholder}
            type='text'/>
          <div
            className={`${displayName}-main-content-input qull-contents`}
            id={`${displayName}-content-editor`}
            key='editor'
            ref='editor'>
            {Boolean(body) && body}
          </div>
        </ReactQuill>*/}
      </Card>
    );
  }

  _handleTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  }

}