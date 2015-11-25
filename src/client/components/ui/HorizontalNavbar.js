import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

const displayName = 'HorizontalNavbar';

export default class HorizontalNavbar extends Component {

  static displayName = displayName;

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
        <li className={`${displayName}-content-item`} key={i}>
          <Link
            activeClassName={`${displayName}-content-item-link-active`}
            className={`${displayName}-content-item-link`}
            to={link.path}>
            {link.name}
          </Link>
        </li>
      );
    });

    return (
      <div className={displayName}>
        <ul className={`${displayName}-content`}>{links}</ul>
      </div>
    );

  }

}