import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Card from '.././ui/Card';

const displayName = 'DocumentViewer';

const DocumentViewer = ({body, children, className, title}) => {
  const classes = classNames(className, displayName);

  return (
    <Card className={classes}>
      {Boolean(title) && <h3 className={`${displayName}-title`}>{title}</h3>}
      <div
        className={`${displayName}-body`}
        contentEditable
        dangerouslySetInnerHTML={{__html: body}}
        disabled/>
    </Card>
  );
};

DocumentViewer.displayName = displayName;
DocumentViewer.propTypes = {
  body: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default DocumentViewer;