import React from 'react';
import ReactQuill from 'react-quill';
import { Toolbar } from 'react-quill';
import ReactTemplate from '../.././shared/ReactTemplate';

import ExitFormIcon from '../.././shared/ExitFormIcon';
import BlendedInputField from '../.././shared/BlendedInputField';


import AppActions from '../../.././actions/AppActions';

export default class NewArticleForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_exitForm');
  }
  _exitForm() {
    AppActions.toggleModal();
  }
  render() {
    let editorStyles = {
      '.ql-editor': {
        'font-size': '18px'
      },
      '.quill-contents': {
        'padding': '0.3rem'
      },
      '.quill-toolbar': {
        'padding': '0.3rem',
        'margin-bottom': '0.5rem'
      }
    };

    return (
      <div className='new-article-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />

        <ReactQuill 
          theme='snow'
          styles={editorStyles}
        >
          <Toolbar
            theme='snow'
            ref='toolbar'
            value='toolbar'
            items={Toolbar.defaultItems}
          />
          <BlendedInputField
            defaultValue='Untitled'
            type='text'
            className='article-title'
          />
          <div
            key='editor'
            ref='editor'
            placeholder='Start Typing here...'
            className='quill-contents'
            dangerouslySetInnerHTML={{__html: 'Start typing here...'}}
          ></div>
        </ReactQuill>
      </div>
    );
  }
}

NewArticleForm.propTypes = {
  contacts: React.PropTypes.array
};