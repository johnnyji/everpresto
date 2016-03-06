import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import CustomPropTypes from '.././CustomPropTypes';
import ClickableIcon from '.././ui/ClickableIcon';
import TemplateCard from './TemplateCard';
import {formatDateString} from '../.././utils/DateHelper';

const displayName = 'TemplateCardPreviewSelect';

export default class TemplateCardPreviewSelect extends Component {
  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
    template: CustomPropTypes.template.isRequired
  };

  render() {
    const {className, onPreview, onSelect, template} = this.props;
    const classes = classNames({
      [className]: className,
      displayName: true
    });

    return (
      <TemplateCard
        body={template.get('body')}
        className={classes}
        onBodyClick={onSelect}
        onTitleClick={onSelect}
        title={template.get('title')}>
        <div className={`${displayName}-options`}>
          <ClickableIcon icon='preview' onClick={onPreview}/>
          <small>{formatDateString(template.get('createdAt'))}</small>
        </div>
      </TemplateCard>
    );
  }
}