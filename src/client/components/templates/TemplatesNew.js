import React, {Component, PropTypes} from 'react';
import NoteForm from '.././notes/NoteForm';

const displayName = 'TemplatesNew';

export default class TemplatesNew extends Component {

  static displayName = displayName;

  render() {
    return (
      <div>
        {displayName}
        <NoteForm
          onTitleChange={() => {}}
          onBodyChange={() => {}}/>
      </div>
    );
  }

}
