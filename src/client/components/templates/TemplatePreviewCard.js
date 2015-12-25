import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {truncateString} from '../.././utils/TextHelper';

import ClickableIcon from '.././ui/ClickableIcon';
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

  render() {
    const {children, className} = this.props;
    const classes = classNames(className, displayName);

    if (children) return <GridViewItem className={classes}>{children}</GridViewItem>;

    const {template} = this.props;
    const titlePreview = truncateString(template.get('title'), 25);

    return (
      <GridViewItem className={classes}>
        <header className={`${displayName}-header`}>
          <h4 className={`${displayName}-header-title`}>{titlePreview}</h4>
          <ClickableIcon
            icon='close'
            onClick={this._handleDelete}
            size={24}/>
        </header>
        <div
          className={`${displayName}-body`}
          dangerouslySetInnerHTML={{__html: template.get('body')}}/>
        <div className={`${displayName}-options`}>
        </div>
      </GridViewItem>
    );
  }

  _handleDelete = () => {
    if (confirm('Are you sure you want to delete this template?')) {
      this.context.dispatch(TemplateActionCreators.deleteTemplate(this.props.template.get('_id')));
    }
  }

}