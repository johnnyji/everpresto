import React, {Component, PropTypes} from 'react';
import AppContentWrapper from '.././app/AppContentWrapper';
import {Link} from 'react-router';

const CLS = 'ui-HorizontalNavbar';

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
    const {links} = this.props;
    const navLinks = links.map((link, i) => {
      return (
        <Link
          activeClassName={`${CLS}-content-link-active`}
          className={`${CLS}-content-link`}
          key={i}
          to={link.path}>
          {link.label}
        </Link>
      );
    });

    return (
      <div className={CLS}>
        <AppContentWrapper>
          <div className={`${CLS}-content`}>{navLinks}</div>
        </AppContentWrapper>
      </div>
    );

  }

}
