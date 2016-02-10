import React, {PropTypes} from 'react';

const displayName = 'ModalSection';

const ModalSection = ({children, title}) => {
  return (
    <section className={displayName}>
      {title && <header className={`${displayName}-title`}>{title}</header>}
      <div>{children}</div>
    </section>
  );
};

ModalSection.displayName = displayName;
ModalSection.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default ModalSection;
