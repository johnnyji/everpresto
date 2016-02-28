import React, {Component, PropTypes} from 'react';
import {EditorState} from 'draft-js';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DraftEditor from '.././editor/DraftEditor';

const displayName = 'ProfileSettings';

export default class ProfileSettings extends Component {

  static displayName = displayName;

  static propTypes = {
    customStyleMap: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      saveCount: 0
    };
  }

  render() {
    const {editorState, saveCount} = this.state;

    return (
      <div>
        <h3>Save Count: {saveCount}</h3>
        <div>
          <DraftEditor
            customStyleMap={this.props.customStyleMap}
            editorState={editorState}
            onEditorStateChange={this._handleEditorStateChange}
            onSave={this._handleSave} />
        </div>
      </div>
    );
  }

  _handleEditorStateChange = (editorState) => {
    this.setState({editorState});
  };

  _handleSave = () => {
    this.setState({saveCount: this.state.saveCount + 1});
  };

}