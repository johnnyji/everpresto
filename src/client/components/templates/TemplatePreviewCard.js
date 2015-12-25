import React, {Component, PropTypes} from 'react';
import classNames from 'classNames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {truncateString} from '../.././utils/TextHelper';

import GridViewItem from '.././ui/GridViewItem';
import Icon from '.././ui/Icon';

import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'TemplatePreviewCard';

export default class TemplatePreviewCard extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    className: PropTypes.string.isRequired,
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
    }).isRequired
  };

  render() {
    const {className, template} = this.props;
    const classes = classNames(className, displayName);
    const titlePreview = truncateString(template.get('title'), 25);

    return (
      <GridViewItem className={classes}>
        <h4 className={`${displayName}-title`}>{titlePreview}</h4>
        <span onClick={this._handleDelete}>
          <Icon icon='close' size='24'/>
        </span>
      </GridViewItem>
    );
  }

  _handleDelete = () => {
    if (confirm('Are you sure you want to delete this template?')) {
      this.context.dispatch(TemplateActionCreators.deleteTemplate(this.props.template.get('_id')));
    }
  }

}