import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import HighlightEditor from '.././shared/HighlightEditor';
import TrixEditor from 'react-trix/lib/react-trix';
import Button from '.././ui/Button';
import Card from '.././ui/Card';
import replaceWordWithHtml from '../.././utils/replaceWordWithHtml';

const PLACEHOLDER_TAG = 'mark';
const PLACEHOLDER_CLASS = 'template-placeholder';

const displayName = 'DocumentEditor';

export default class DocumentEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string.isRequired,
    className: PropTypes.string,
    highlightable: PropTypes.bool.isRequired,
    isTemplateEditor: PropTypes.bool.isRequired,
    onBodyChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    templatePlaceholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    titlePlaceholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    body: '',
    highlightable: true,
    isTemplateEditor: false,
    templatePlaceholders: Immutable.List(),
    title: '',
    titlePlaceholder: 'Untitled Document',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {body, className, isTemplateEditor, onBodyChange, templatePlaceholders, title, titlePlaceholder} = this.props;
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
          isTemplateEditor={true}
          onUpdate={onBodyChange}
          templatePlaceholders={['beer']}
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

  _handleChange = (target) => {
    debugger;

    const {isTemplateEditor, templatePlaceholders, onBodyChange} = this.props;
    // If we enable the ability to highlight template placeholders, we want to
    // check for new placeholders everytime the text changes
    if (isTemplateEditor && templatePlaceholders.size > 0) {
      text = this._highlightPlaceholders(text, templatePlaceholders);
      console.log(text);
    }

    onBodyChange(text);
  }

  _highlightPlaceholders = (text, placeholders = this.props.templatePlaceholders) => {
    return placeholders.reduce((alteredText, placeholder) => {
      return replaceWordWithHtml(text, placeholder, PLACEHOLDER_TAG, PLACEHOLDER_CLASS);
    }, text);
  }

}