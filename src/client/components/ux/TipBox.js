import React, {PropTypes} from 'react';
import Icon from './Icon';

export default class TipBox extends React.Component {

  static propTypes = {
    headerText: PropTypes.element.isRequired,
    text: PropTypes.element.isRequired
  }

  static defaultProps = {
    headerText: 'Here\'s a tip:'
  }

  render() {
    return (
      <div className='tip-box'>
        <div className='tip-box-header'>
          <Icon icon='help' iconClass='tip-box-header-icon' /> {this.props.headerText}
        </div>  
        {this.props.text}
      </div>
    );
  }

}
