import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class HorizontalNavbar extends React.Component {

  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  static propTypes = {
    navLinks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    ).isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    const currentPath = this.context.location.pathname;
    const links = this.props.navLinks.map((link, i) => {
      return (
        <li className='horizontal-navbar-content-item' key={i}>
          <Link
            activeClassName='horizontal-navbar-content-item-tab-active'
            className='horizontal-navbar-content-item-tab'
            to={link.path}>
            {link.name}
          </Link>
        </li>
      );
    });

    return (
      <div className='horizontal-navbar'>
        <ul className='horizontal-navbar-content'>{links}</ul>
      </div>
    );
  }

}