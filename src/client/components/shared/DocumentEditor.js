import React, {Component, PropTypes} from 'react';
import ReactQuill, {Toolbar} from 'react-quill';
import MediumEditor from 'medium-editor';
import classNames from 'classnames';
import HighlightEditor from '.././shared/HighlightEditor';
import Button from '.././ui/Button';
import Card from '.././ui/Card';

const editor = new MediumEditor('.editable');


const getSelectedText = () => {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

const defaultColors = [
  'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
  'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
  'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
  'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
  'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
  'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
  'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
  'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
  'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
  'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
  'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
  'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
].map((color) => ({ value: color }));

const customToolbarItems = [
  { label:'Formats', type:'group', items: [
    // Keep fonts commented, we don't want users to select custom fonts.
    // 
    // { label:'Font', type:'font', items: [
    //   { label:'Sans Serif',  value:'sans-serif' },
    //   { label:'Serif',       value:'serif' },
    //   { label:'Monospace',   value:'monospace' }
    // ]},
    // { type:'separator' },
    { label:'Size', type:'size', items: [
      { label:'Normal',  value:'10px' },
      { label:'Smaller', value:'13px' },
      { label:'Larger',  value:'18px' },
      { label:'Huge',    value:'32px' }
    ]},
    { type:'separator' },
    { label:'Alignment', type:'align', items: [
      { label:'', value:'center' },
      { label:'', value:'left' },
      { label:'', value:'right' },
      { label:'', value:'justify' }
    ]}
  ]},

  { label:'Text', type:'group', items: [
    { type:'bold', label:'Bold' },
    { type:'italic', label:'Italic' },
    { type:'strike', label:'Strike' },
    { type:'underline', label:'Underline' },
    { type:'separator' },
    { type:'color', label:'Color', items: defaultColors },
    { type:'background', label:'Background color', items: defaultColors },
    { type:'separator' },
    { type:'link', label:'Link' }
  ]},
  { label:'Blocks', type:'group', items: [
    { type:'bullet', label:'Bullet' },
    { type:'separator' },
    { type:'list', label:'List' }
  ]}
];

const EMPTY_BODY = '<div><br></div>';
const EDITOR_ID = 'ql-editor-1';
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
    this.state = {
      text: 'Confucious say, you go to jail bad boy.',
      highlighted: {
        text: null,
        startIndex: null,
        endIndex: null
      },
      yolo: false
    };
  }

  componentDidMount() {
    // if (!Boolean(this.props.body)) this._showPlaceholder();

    // TODO: Why is the event listener not working?
    // 
    // const editor = document.getElementById('DocumentEditor-content-editor');
    // editor.addEventListener('onmouseup', this._handleHighlightEnd);
  }

  // componentWillUnmount() {
  //   const editor = document.getElementById('DocumentEditor-content-editor');
  //   editor.removeEventListener('onmouseup', this._handleHighlightEnd); 
  // }

  render() {
    const {body, className, isTemplateEditor, title, titlePlaceholder} = this.props;
    const classes = classNames(className, displayName);

    return (
      <Card className={classes}>
        <input
          autoFocus
          className={`${displayName}-main-title-input`}
          defaultValue={title}
          ref='title'
          placeholder={titlePlaceholder}
          type='text'/>
        <HighlightEditor
          className={`${displayName}-main-content-input`}
          onUpdate={(text) => this.setState({text})}
          text={this.state.text}/>
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

  _handleBodyChange = (body) => {
    if (body === EMPTY_BODY) this._showPlaceholder();
    this.props.onBodyChange(body);
  }

  _handleTextHighlight = (range, source) => {
    const textHighlighted = range && range.start !== range.end;

    if (this.props.highlightable && source === 'user' && textHighlighted) {
      this.setState({
        yolo: true,
        highlighted: {
          text: getSelectedText(),
          startIndex: range.start,
          endIndex: range.end
        }
      });
    }
  }

  _handleTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  }

  _showPlaceholder = () => {
    const editor = this.refs.quill.refs.editor;
    editor.firstChild.innerHTML = '';
  }

}