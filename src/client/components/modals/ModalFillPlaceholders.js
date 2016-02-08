import React, {Component, PropTypes} from 'react';
import Baby from 'babyparse';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUIList from 'material-ui/lib/lists/list';
import {equals, get} from '../.././utils/immutable/IterableFunctions';
import {createFlashMessage} from '../.././actions/AppActionCreators';
import {minLength} from '../.././utils/RegexHelper';

import FileUploader from '.././shared/FileUploader';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
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
      assignedHeaders: Immutable.List(),
      mappings: Immutable.fromJS({
        values: [],
        errors: []
      }),
      importedData: null,
      stage: 0
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const {mappings} = this.state;
    const {mappings: nextMappings} = nextState;
    // If the mappings are different, updates the state of the headers
    // already assigned to placeholders
    if (!nextMappings.equals(mappings)) {
      this.setState({
        assignedHeaders: nextMappings.get('values').map(get('header'))
      })
    }
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
    const {assignedHeaders, mappings, importedData} = this.state;

    const mappingRows = mappings.get('values').map((value, i) => {
      return (
        <div className={`${displayName}-mapping-section-list-item`} key={i}>
          <Input
            defaultValue={value.get('header')}
            error={mappings.getIn(['errors', i])}
            errorKeys={`errors:${i}`}
            label='Header Value'
            onUpdate={(val, err) => this._handleMappingUpdate(val, err, i)}
            patternMatches={minLength(1, `Please map a header to ${value.get('placeholder')}`)}
            successKeys={`values:${i}:header`}
            value={value.get('header')}/>
          <Icon icon='chevron-right' />
          <mark>{value.get('placeholder')}</mark>
        </div>
      );
    });
    const headers = importedData.get('headers').map((header, i) => {
      if (assignedHeaders.contains(header)) {
        return <li key={i}><strike>{header}</strike></li>;
      }
      return <li key={i}><span>{header}</span></li>;
    });

    return (
      <div className={`${displayName}-mapping-section`}>
        <ul>{headers}</ul>
        <MUIList>{mappingRows}</MUIList>
      </div>
    );
  };

  /**
   * Generates an array of header to placeholder mapping -> {header, placeholder}
   * @param  {Array} sortedHeaders      - The sorted headers from the file import
   * @param  {Array} sortedPlaceholders - The sorted placeholder values
   * @return {Immutable.Map}            - The mappings between the headers and the placeholder
   *                                      values
   */
  _generateMappings = (sortedHeaders, sortedPlaceholders) => {
    return sortedPlaceholders.reduce((mappings, placeholder, i) => {
      const header = sortedHeaders[i];

      let updatedMapping = (header === undefined)
        ? mappings.update('values', (vals) => vals.push(Immutable.fromJS({header: null, placeholder})))
        : mappings.update('values', (vals) => vals.push(Immutable.fromJS({header, placeholder})));

      return updatedMapping.update('errors', (errs) => errs.push(null));
    }, this.state.mappings);
  };

  /**
   * Fires a flash message error
   * @param  {String|React.Element} error - The error being fired
   */
  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  };

  /**
   * Resets the form back to it's original state with no imported file
   */
  _handleFileInputReset = () => {
    this.setState({
      mappings: Immutable.fromJS({
        values: [],
        errors: []
      }),
      importedData: null,
      stage: 0
    });
  };

  /**
   * Imports a CSV file and generates the mappings based on it's headers
   * @param  {Object} file - The file object
   */
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
        mappings: this._generateMappings(
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

  /**
   * Updates a mapping item
   */
  _handleMappingUpdate = (val, err, i) => {
    const {assignedHeaders, mappings} = this.state;

    let errorMessage = assignedHeaders.filter(equals(val)).size > 1
      ? `Duplicate mapping of ${assignedHeaders.find(equals(val))}`
      : err;

    let updatedMappings = mappings.setIn(['values', i, 'header'], val);
    updatedMappings = updatedMappings.setIn(['errors', i], errorMessage);

    this.setState({mappings: updatedMappings});
  };

}