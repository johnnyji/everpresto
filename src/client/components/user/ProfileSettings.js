import React, {Component, PropTypes} from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
// import DraftEditor from '.././ui/DraftEditor';

const displayName = 'ProfileSettings';

export default class ProfileSettings extends Component {

  static displayName = displayName;

  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      saveCount: 0
    };
  }

  render() {
    const {editorState, saveCount} = this.state;

    return (
      <div>
        <h3>Save Count: {saveCount}</h3>
        <div>
          {/*<DraftEditor
            editorState={editorState}
            onEditorStateChange={this._handleEditorStateChange}
            onSave={this._handleSave} />*/}
        </div>
      </div>
    );
  }

  _handleEditorStateChange = (editorState) => {
    this.setState({editorState});
  };

  _handleSave = () => {
    this.setState({saveCount: saveCount + 1});
  };

}