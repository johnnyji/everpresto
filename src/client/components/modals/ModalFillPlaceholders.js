import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUITextField from 'material-ui/lib/text-field';
import MUIList from 'material-ui/lib/lists/list';
import {get} from '../.././utils/immutable/IterableFunctions';
import {createFlashMessage} from '../.././actions/AppActionCreators';

import FileUploader from '.././shared/FileUploader';
import Icon from '.././ui/Icon';
import ListItem from '.././ui/ListItem';
import ModalWrapper from '.././ui/ModalWrapper';

const displayName = 'ModalFillPlaceholders';

export default class ModalFillPlaceholders extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    placeholders: ImmutablePropTypes.contains({
      value: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    return (
      <ModalWrapper className={displayName} height={600} width={500}>
          <FileUploader
            className={`${displayName}-upload-button`}
            label={<span><Icon icon='file-upload'/> CSV</span>}
            onUpload={this._handleImportCsv}
            permittedExtensions={['.csv']}/>
        <MUIList>
          {this._renderTemplateInputs()}
        </MUIList>
      </ModalWrapper>
    );
  }

  _renderTemplateInputs = () => {
    return this.props.placeholders.map((placeholder, i) => {
      return (
        <MUITextField
          key={i}
          hintText={placeholder.get('value')}/>
      );
    });
  };

  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  }

  _handleImportCsv = (file) => {
    const reader = new FileReader();

    // When the upload is complete
    reader.onloadend = () => {
      // If the file reader has trouble reading a file, we alert the error
      if (reader.error) return this._handleError(reader.error);

      const placeholderValues = this.props.placeholders.map(get('value'));
      const [headers, ...rows] = reader.result.split('\n');
      const firstMissedHeader = placeholderValues.find((value) => headers.indexOf(value) < 0);

      if (firstMissedHeader !== undefined) {
        return this._handleError(
          <div>
            <br/>
            <strong>{firstMissedHeader}</strong>
            <p>Must be defined as a header in your CSV file.</p>
          </div>
        );
      }
      console.log('yay');
    };

    // Reads the user uploaded file as an array buffer
    reader.readAsText(file);
  };

}