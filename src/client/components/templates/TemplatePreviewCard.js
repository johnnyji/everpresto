import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import CustomPropTypes from '.././CustomPropTypes';

import ClickableIcon from '.././ui/ClickableIcon';
import DropdownOptions from '.././ui/DropdownOptions';
import Icon from '.././ui/Icon';
import ModalDocumentPreview from '.././modals/ModalDocumentPreview';
import DocumentPreviewCard from '.././shared/DocumentPreviewCard';

import AppActionCreators from '../.././actions/AppActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'TemplatePreviewCard';

export default class TemplatePreviewCard extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    template: CustomPropTypes.template.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showDropdownOptions: false
    };
  }

  render() {
    const {className, template} = this.props;
    const {showDropdownOptions} = this.state;
    const classes = classNames(className, displayName);
    const dropdownOptions = [
      {label: 'Preview', callback: this._handlePreview},
      {label: 'Edit', callback: this._handleEditView},
      {label: 'Delete', callback: this._handleDelete}
    ];

    return (
      <DocumentPreviewCard
        body={template.get('body')}
        className={classes}
        onBodyClick={this._handleEditView}
        onTitleClick={this._handleEditView}
        title={template.get('title')}>
        <DropdownOptions
          className={`${displayName}-dropdown`}
          onHideDropdown={this._toggleOptions}
          options={dropdownOptions}
          showDropdownOptions={showDropdownOptions}/>
        <ClickableIcon
          className={`${displayName}-more-options`}
          icon={showDropdownOptions ? 'close' : 'ellipsis'}
          onClick={this._toggleOptions}/>
      </DocumentPreviewCard>
    );
  }

  _handleEditView = () => {
    this.context.dispatch(
      TemplateActionCreators.setTemplateBeingEdited(this.props.template)
    );
  }

  _handleDelete = () => {
    if (confirm('Are you sure you want to delete this template?')) {
      this.context.dispatch(TemplateActionCreators.deleteTemplate(this.props.template.get('_id')));
    }
  }

  _handlePreview = () => {
    const {template} = this.props;

    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalDocumentPreview
          body={template.get('body')}
          title={template.get('title')}/>
      )
    );
  }

  _renderOptions = () => {
    if (!this.state.showDropdownOptions) return;
  }

  _toggleOptions = () => {
    this.setState({showDropdownOptions: !this.state.showDropdownOptions});
  }

}