import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import AppContentWrapper from '.././app/AppContentWrapper';

const className = 'ui-HorizontalNavbar';

export default class HorizontalNavbar extends Component {

  static displayName = 'HorizontalNavbar';

  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  render() {
    const links = this.props.links.map((link, i) => {
      return (
        <Link
          activeClassName={`${className}-content-link-active`}
          className={`${className}-content-link`}
          key={i}
          to={link.path}>
          {link.label}
        </Link>
      );
    });

    return (
      <div className={className}>
        <AppContentWrapper>
          <div className={`${className}-content`}>{links}</div>
        </AppContentWrapper>
      </div>
    );

  }

}