import React from 'react';

export default class NoteItem extends React.Component {
  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

NoteItem.propTypes = {
  note: React.PropTypes.object.isRequired
};