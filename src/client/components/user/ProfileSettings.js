import React, {Component, PropTypes} from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

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
