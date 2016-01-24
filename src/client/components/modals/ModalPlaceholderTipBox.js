import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Icon from '.././ui/Icon';
import ModalWrapper from '.././ui/ModalWrapper';
import TipBox from '.././ui/TipBox';

const displayName = 'ModalPlaceholderTipBox';

const ModalPlaceholderTipBox = ({className}) => (
  <ModalWrapper className={classNames(className, displayName)} width={500} height={450}>
    <TipBox
      color='dark'
      className={`${displayName}-content`}
      title='What are placeholders?'
      titleClass={`${displayName}-content-title`}>
     <div className={`${displayName}-content-info`}>Placeholders are used to easily replace values in templates (this makes templates extremely useful and re-usable)!
     </div>
     <div className={`${displayName}-content-example`}>
      <p>Examples: </p>
      <p className={`${displayName}-content-example-section`}>
        <Icon icon='check' iconClass={`${displayName}-content-example-section-icon-success`}/>
        <mark className={`${displayName}-content-example-section-placeholder`}>FIRST_NAME</mark>
        <span className={`${displayName}-content-example-section-note`}>All capitalized</span>
      </p>
      <p className={`${displayName}-content-example-section`}>
        <Icon icon='check' iconClass={`${displayName}-content-example-section-icon-success`}/>
        <mark className={`${displayName}-content-example-section-placeholder`}>EMAIL_ADDRESS</mark>
        <span className={`${displayName}-content-example-section-note`}>Consistent format</span>
      </p>
      <p className={`${displayName}-content-example-section`}>
        <Icon icon='close' iconClass={`${displayName}-content-example-section-icon-error`}/>
        <mark className={`${displayName}-content-example-section-placeholder`}>birthdate</mark>
        <span className={`${displayName}-content-example-section-note`}>No lowercase letters!</span>
      </p>
     </div>
    </TipBox>
  </ModalWrapper>
);

ModalPlaceholderTipBox.displayName = displayName;
ModalPlaceholderTipBox.propTypes = {
  className: PropTypes.string
};

export default ModalPlaceholderTipBox;