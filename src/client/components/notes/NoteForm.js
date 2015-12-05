import React, {Component, PropTypes} from 'react';
import ReactQuill, {Toolbar} from 'react-quill';
import Card from '.././ui/Card';
import BlendedInputField from '.././shared/BlendedInputField';

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

export default class NoteForm extends Component {

  static propTypes = {
    onBodyChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    titlePlaceholder: PropTypes.string.isRequired
  };

  static defaultProps = {
    titlePlaceholder: 'Untitled Document'
  };

  componentDidMount() {
    this._showPlaceholder();
  }

  render() {
    const {titlePlaceholder} = this.props;

    return (
      <Card className='note-form-wrapper'>
        <ReactQuill 
          ref='quill'
          theme='snow'
          onChange={this._handleBodyChange}>
          <Toolbar
            theme='snow'
            key='toolbar'
            ref='toolbar'
            items={customToolbarItems}
          />
          <BlendedInputField
            isTextArea={true}
            placeholder={titlePlaceholder}
            type='text'
            className='note-title'
            onChange={this._handleTitleChange}
          />
          <div
            key='editor'
            ref='editor'
            className='quill-contents'
          ></div>
        </ReactQuill>
      </Card>
    );
  }

  _handleTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  }

  _handleBodyChange = (body) => {
    if (body === '<div><br></div>') this._showPlaceholder();

    // update the body of the document
    this.props.onBodyChange(body);
  }

  _showPlaceholder = () => {
    const editor = this.refs.quill.refs.editor;
    editor.firstChild.innerHTML = '';
  }

}