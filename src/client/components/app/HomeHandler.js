import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import AuthHelper from '../.././utils/AuthHelper';
import { Link } from 'react-router';

export default class HomeHandler extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    AuthHelper.updateCurrentUser();    
  }
  render() {
    return (
      <div>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='join'>Try for free!</Link>
      </div>
    );
  }
}