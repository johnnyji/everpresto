import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ModalSection';

const ModalSection = ({className, children, title}) => {
  return (
    <section className={classNames(className, displayName)}>
      {title && <header className={`${displayName}-title`}>{title}</header>}
      <div className={`${displayName}-body`}>{children}</div>
    </section>
  );
};

ModalSection.displayName = displayName;
ModalSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default ModalSection;
