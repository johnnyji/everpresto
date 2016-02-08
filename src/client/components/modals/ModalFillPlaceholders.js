import React, {Component, PropTypes} from 'react';
import Baby from 'babyparse';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUIList from 'material-ui/lib/lists/list';
import MUITextField from 'material-ui/lib/text-field';
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

  constructor(props) {
    super(props);
    this.state = {
      mappingData: null,
      importedData: null,
      stage: 0
    };
  }

  render() {
    const {stage} = this.state;
    return (
      <ModalWrapper className={displayName} height={600} width={500}>
        <FileUploader
          label={<span><Icon icon='file-upload'/> Import CSV File</span>}
          onReset={this._handleFileInputReset}
          onUpload={this._handleImportCsv}
          permittedExtensions={['.csv']}
          ref='fileUploader'/>
        {stage === 0 && <span>Insert star wars quote here</span>}
        {stage === 1 && this._renderMappingSection()}
      </ModalWrapper>
    );
  }

  _renderMappingSection = () => {
    return (
      <div className={`${displayName}-mapping-section`}>
        <MUIList>
          {this.state.mappingData.map((data, i) => (
            <div
              className={`${displayName}-mapping-section-list-item`}
              key={i}>
              <MUITextField
                defaultValue={data.csvHeader}
                hintText='Header Value'/>
              <Icon icon='chevron-right' />
              <mark>{data.placeholder}</mark>
            </div>
          ))}
        </MUIList>
      </div>
    );
  };

  _createMappingTableData = (sortedHeaders, sortedPlaceholders) => {
    return sortedPlaceholders.map((placeholder, i) => {
      const header = sortedHeaders[i];

      if (header === undefined) return {csvHeader: null, placeholder};
      return {csvHeader: header, placeholder};
    });
  };

  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  };

  _handleFileInputReset = () => {
    this.setState({
      mappingData: null,
      importedData: null,
      stage: 0
    });
  }

  _handleImportCsv = (file) => {
    const reader = new FileReader();

    // When the upload is complete
    reader.onloadend = () => {
      // If the file reader has trouble reading a file, we alert the error
      if (reader.error) return this._handleError(reader.error);
      // `Baby` will parse the CSV data string into a 2D array
      const [headers, ...rows] = Baby.parse(reader.result).data;
      const placeholderValues = this.props.placeholders.map(get('value'));
      
      if (headers.length < placeholderValues.size) {
        return this._handleError(
          `There are ${placeholderValues.size - headers.length} headers missing in your CSV`
        );
      }
      // Sets the imported data state and toggles the form to the next stage
      this.setState({
        mappingData: this._createMappingTableData(
          headers.sort(),
          placeholderValues.toJS().sort()
        ),
        importedData: Immutable.fromJS({headers, rows}),
        stage: 1
      });
    };

    // Reads the user uploaded file as an array buffer
    reader.readAsText(file);
  };

  _handleTableDataChange = () => {

  };

}