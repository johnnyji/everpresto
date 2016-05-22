import React, {Component} from 'react';
import DashboardContentWrapper from '../dashboard/DashboardContentWrapper';
import ProgressBar from '../ui/ProgressBar';
import Rx from 'rxjs/Rx';
import {findDOMNode} from 'react-dom';

const displayName = 'TestView';

/*
 * This is a view to quickly test new components by mounting them
 * somewhere in the app. REMOVE IN PROD
 */
export default class TestView extends Component {

  static displayName = displayName;

  state = {
    progressCount: 0,
    totalCount: 84
  };

  componentDidMount() {
    const startClick$ = Rx.Observable.fromEvent(findDOMNode(this.refs.startButton), 'click');

    startClick$
      .switchMapTo(Rx.Observable.interval(50))
      .map(() => 1)
      .scan((accum, curr) => accum + curr)
      .startWith(0)
      .takeWhile((x) => x <= this.state.totalCount)
      .subscribe((x) => {
        this.setState({progressCount: x});
      });
  }
  
  render() {
    return (
      <DashboardContentWrapper>
        <button ref='startButton'>Start Loader</button>
        <h1>{this.state.progressCount} / {this.state.totalCount}</h1>
        <ProgressBar
          height={50}
          progressCount={this.state.progressCount}
          totalCount={this.state.totalCount}
          width={600} />
      </DashboardContentWrapper>
    );
  }

}

