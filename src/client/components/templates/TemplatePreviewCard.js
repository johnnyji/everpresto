import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {truncateString} from '../.././utils/TextHelper';

import ClickableIcon from '.././ui/ClickableIcon';
import DropdownOptions from '.././ui/DropdownOptions';
import GridViewItem from '.././ui/GridViewItem';
import Icon from '.././ui/Icon';
import ModalDocumentPreview from '.././modals/ModalDocumentPreview';

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
    template: ImmutablePropTypes.contains({
      _id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      placeholders: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        })
      ).isRequired,
      rawText: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      showDropdownOptions: false
    };
  }

  render() {
    const {children, className} = this.props;
    const {showDropdownOptions} = this.state;
    const classes = classNames(className, displayName);

    if (children) return <GridViewItem className={classes}>{children}</GridViewItem>;

    const {template} = this.props;
    const titlePreview = truncateString(template.get('title'), 25);
    const dropdownOptions = [
      {label: 'Preview', callback: this._handlePreview},
      {label: 'Edit', callback: this._handleEditView},
      {label: 'Delete', callback: this._handleDelete}
    ];

    return (
      <GridViewItem className={classes}>
        <header className={`${displayName}-header`}>
          <h4 className={`${displayName}-header-title`}>{titlePreview}</h4>
        </header>
        <div
          className={`${displayName}-body`}
          dangerouslySetInnerHTML={{__html: template.get('body')}}
          onClick={this._handleEditView}/>
        <div className={`${displayName}-options`}>
          <ClickableIcon
            icon={showDropdownOptions ? 'close' : 'ellipsis'}
            onClick={this._toggleOptions}/>
        </div>
        <DropdownOptions
          className={`${displayName}-dropdown`}
          onHideDropdown={this._toggleOptions}
          options={dropdownOptions}
          showDropdownOptions={showDropdownOptions}/>
      </GridViewItem>
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