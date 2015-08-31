import React from 'react';
import ReactTemplate from './ReactTemplate';
import ExitFormIcon from './ExitFormIcon';

export default class ErrorMessageBox extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_dismissError');
  }
  _dismissError() {
    this.props.dismissError();
  }
  render() {
    let p = this.props;

    if (!p.message) return <div />;

    return (
      <div>
        <ExitFormIcon onExitClick={this._dismissError} />
        <p>{p.message}</p>
      </div>
    );
  }
}

ErrorMessageBox.propTypes = {
  message: React.PropTypes.string,
  dismissError: React.PropTypes.func.isRequired
}