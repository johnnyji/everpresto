import React from 'react';
import Icon from './Icon';

export default class ExitFormIcon extends React.Component {
  constructor(props) {
    super(props);
    this._exitForm = this._exitForm.bind(this);
  }
  _exitForm() {
    this.props.onExitClick();
  }
  render() {
    return (
      <div className='exit-form-icon-wrapper' onClick={this._exitForm}>
        <Icon icon='close' />
      </div>
    );
  }
}

ExitFormIcon.propTypes = {
  onExitClick: React.PropTypes.func.isRequired
};