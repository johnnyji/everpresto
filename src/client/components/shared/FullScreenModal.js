import React, {PropTypes} from 'react';

export default class FullScreenModal extends React.Component {

  static propTypes = {
    content: PropTypes.element.isRequired
  };

  componentWillMount() {
    document.body.classList.add('noscroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('noscroll');
  }

  _exitModal = () => {

  }

  render() {
    return (
      <div className='full-screen-modal'>
        <div className='full-screen-modal-background' onClick={this._exitModal}></div>
        {this.props.content}
      </div>
    );
  }
}