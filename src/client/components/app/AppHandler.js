import React, {Component, PropTypes} from 'react';

import FullScreenModal from '.././shared/FullScreenModal';
import NewNoteForm from '.././notes/NewNoteForm';
import NewGroupForm from '.././groups/NewGroupForm';


export default class AppHandler extends Component {

  static displayName = 'AppHandler';

  render() {
    let modal;

    // // If the user is creating a new note.
    // if (this.state.modal.newNote) {
    //   const modalContent = <NewNoteForm currentUser={currentUser} />
    //   modal = <FullScreenModal content={modalContent} />;
    // }

    // // If the user is creating a new group.
    // if (this.state.modal.newGroup) {
    //   const modalContent = <NewGroupForm currentUser={currentUser} />
    //   modal = <FullScreenModal content={modalContent} />;
    // }
    
    return (
      <div className='page-wrapper'>
        {modal}
        <div className='content-container'>
          {/*Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0*/}
          {this.props.children}
        </div>
      </div>
    );
  }

}