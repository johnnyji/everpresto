import React, {PropTypes, PureComponent} from 'react';
import AppActionCreators from '../../../actions/AppActionCreators';
import classNames from 'classnames';
import Clickable from 'ui-components/src/Clickable';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import DropdownOptions from '../../../components/ui/DropdownOptions';
import Icon from 'ui-components/src/Icon';
import ModalDocumentPreview from '.././modals/ModalDocumentPreview';
import styles from '../styles/TemplatePreviewCard.scss';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import TemplateCard from './TemplateCard';

export default class TemplatePreviewCard extends PureComponent {

  static displayName = 'TemplatePreviewCard';

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
    const dropdownOptions = [
      {label: 'Preview', callback: this._handlePreview},
      {label: 'Edit', callback: this._handleEditView},
      {label: 'Delete', callback: this._handleDelete}
    ];

    return (
      <TemplateCard
        body={template.get('body')}
        className={classNames(styles.main, className)}
        defaultTitle='Untitled Template'
        onBodyClick={this._handleEditView}
        onTitleClick={this._handleEditView}
        title={template.get('title')}>
        <DropdownOptions
          className={styles.dropdown}
          onHideDropdown={this._toggleOptions}
          options={dropdownOptions}
          showDropdownOptions={showDropdownOptions} />
        <Clickable
          className={styles.moreOptions}
          onClick={this._toggleOptions}>
          <Icon name={showDropdownOptions ? 'close' : 'ellipsis'} />
        </Clickable>
      </TemplateCard>
    );
  }

  _handleEditView = () => {
    this.context.dispatch(
      TemplateActionCreators.setTemplateBeingEdited(this.props.template)
    );
  }

  _handleDelete = () => {
    if (confirm('Are you sure you want to delete this template?')) {
      this.context.dispatch(TemplateActionCreators.deleteTemplate(this.props.template.get('id')));
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
