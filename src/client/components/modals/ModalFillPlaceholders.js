import React, {Component, PropTypes} from 'react';
import Baby from 'babyparse';
import classNames from 'classnames';
import flow from 'lodash/flow';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {equals, get} from '../.././utils/immutable/IterableFunctions';
import {minLength} from '../.././utils/RegexHelper';
import {pluralize} from '../.././utils/TextHelper';
import {createFlashMessage, dismissModal} from '../.././actions/AppActionCreators';
import {addMultipleSigners} from '../.././actions/DocumentNewActionCreators';
import FlashErrorHandler from '../.././decorators/FlashErrorHandler';

import DashboardQuote from '.././dashboard/DashboardQuote';
import ModalSection from '.././modals/ModalSection';
import FileUploader from '.././shared/FileUploader';
import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import Pill from '.././ui/Pill';
import ModalWrapper from '.././ui/ModalWrapper';


const displayName = 'ModalFillPlaceholders';

@FlashErrorHandler
export default class ModalFillPlaceholders extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        isRequired: PropTypes.bool.isRequired,
        tip: PropTypes.string,
        type: PropTypes.oneOf(['specific']).isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
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
    const {importedData, stage} = this.state;

    return (
      <ModalWrapper className={displayName} height={600} width={650}>
        <FileUploader
          label={<span><Icon icon='file-upload'/> Import CSV File</span>}
          onReset={this._handleFileInputReset}
          onUpload={this._handleImportCsv}
          permittedExtensions={['.csv']}/>
        {stage === 0 && 
          <DashboardQuote
            author="Lord Vader"
            quote="Commander, tear this ship apart until you find that CSV file!"/>
        }
        {stage === 1 && this._renderMappingSection()}
        {stage === 1 &&
          <Button
            color='green'
            icon='check'
            onClick={this._handleSaveSigners}
            text={`Save ${pluralize(importedData.get('rows').size, 'signer', 'signers')}`}/>
        }
      </ModalWrapper>
    );
  }

  _renderMappingSection = () => {
    const {assignedHeaders, mappings, importedData} = this.state;

    const mappingRows = mappings.get('values').map((value, i) => {
      return (
        <li className={`${displayName}-mapping-section-mappings-item`} key={i}>
          <Input
            defaultValue={value.get('header')}
            error={mappings.getIn(['errors', i])}
            errorKeys={`errors:${i}`}
            label='Header Value'
            onUpdate={(val, err) => this._handleMappingUpdate(val, err, i)}
            patternMatches={minLength(1, `Please map a header to ${value.get('placeholder')}`)}
            ref={`mappings-${i}`}
            successKeys={`values:${i}:header`}
            value={value.get('header')}
            width={300}/>
          <mark>{value.get('placeholder')}</mark>
        </li>
      );
    });
    const headers = importedData.get('headers').map((header, i) => {
      const isAssigned = assignedHeaders.contains(header);
      return (
        <Pill
          color={isAssigned ? 'gray' : 'blue'}
          key={i}
          size={14}
          strike={isAssigned}>
          {header}
        </Pill>
      );
    });

    return (
      <div className={`${displayName}-mapping-section`}>
        <ModalSection title='Imported File Headers'>
          <ul className={`${displayName}-mapping-section-assigned-headers`}>{headers}</ul>
        </ModalSection>
        <ModalSection title='Map To Fields'>
          <ul className={`${displayName}-mapping-section-mappings`}>{mappingRows}</ul>
        </ModalSection>
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
   * Checks for errors and dispatches an action that saves multiple signers
   */
  _handleSaveSigners = () => {
    const {importedData, mappings} = this.state;
    const firstFoundError = mappings.get('errors').find((_, i) => (
      !this.refs[`mappings-${i}`].valid()
    ));

    if (firstFoundError !== undefined) {
      return this.props.handleFlashError('Hmmm... There are some errors in your mappings');
    }

    // TODO: Refactor into another function, too much logic here, and comment as well
    const importedHeaders = importedData.get('headers');
    const placeholderMappings = mappings
      .get('values')
      .toJS()
      .map((val) => ({
        placeholder: val.placeholder,
        headerIndex: importedHeaders.indexOf(val.header)
      }));
    const signers = importedData
      .get('rows')
      .toJS()
      .map((row) => {
        return placeholderMappings.map((mapping) => ({
          placeholder: mapping.placeholder,
          value: row[mapping.headerIndex]
        }));
      })
      ;

    const {dispatch} = this.context;
    // Adds the imported signers: Flattens the signers, specifies the action, dispatches the action
    flow(addMultipleSigners, dispatch)(signers);
    flow(dismissModal, dispatch)();
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
      if (reader.error) return this.props.handleFlashError(reader.error);
      // `Baby` will parse the CSV data string into a 2D array
      const [headers, ...rows] = Baby.parse(reader.result).data;
      const placeholderValues = this.props.placeholders.map(get('value'));
      
      if (headers.length < placeholderValues.size) {
        return this.props.handleFlashError(
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
    const {assignedHeaders, mappings, importedData} = this.state;
    let errorMessage = err;

    // If a header that's already assigned if being assigned again, make the error
    // a duplication error
    if (assignedHeaders.filter(equals(val)).size > 1) {
      errorMessage = `Duplicate mapping of ${assignedHeaders.find(equals(val))}`;
    }
    // If the entered value is not a header
    if (!importedData.get('headers').contains(val) && val !== '') {
      errorMessage = `${val} is not a header in your file`;
    }

    let updatedMappings = mappings.setIn(['values', i, 'header'], val);
    updatedMappings = updatedMappings.setIn(['errors', i], errorMessage);

    this.setState({mappings: updatedMappings});
  };

}