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
        <li className={`${className}-content-item`} key={i}>
          <Link
            activeClassName={`${className}-content-item-link-active`}
            className={`${className}-content-item-link`}
            to={link.path}>
            {link.label}
          </Link>
        </li>
      );
    });

    return (
      <div className={className}>
        <AppContentWrapper>
          <ul className={`${className}-content`}>{links}</ul>
        </AppContentWrapper>
      </div>
    );

  }

}