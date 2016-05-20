import React, {Component, PropTypes} from 'react';
import Rx from 'rxjs/Rx';
import AppActionCreators from '../.././actions/AppActionCreators';
import {findDOMNode} from 'react-dom';
import pureRender from 'pure-render-decorator';

const displayName = 'FlashMessage';

@pureRender
export default class FlashMessage extends Component {

  static displayName = displayName;

  static propTypes = {
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']).isRequired,
    content: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    color: 'blue'
  };

  componentDidMount() {
    const removeButton = findDOMNode(this.refs['removeButton']);

    // When the flash times out naturally
    const timer$ = Rx.Observable.interval(3000);
    // When the flash message is clicked
    const removeButtonClick$ = Rx.Observable.fromEvent(removeButton, 'click');
    
    // Will unmount this component if the timer times out or the component is clicked
    Rx.Observable
      .merge(timer$, removeButtonClick$)
      .take(1)
      .subscribe(() => {}, () => {}, () => {
        this.context.dispatch(AppActionCreators.dismissFlashMessage());
      });
  }

  render() {
    const {color, content} = this.props;
    const className = `ui-${displayName}`;

    return (
      <div
        className={className}
        ref='removeButton'>
        <div className={`${className}-content ${className}-${color}`}>
          <span className={`${className}-content-message`}>
            {content}
          </span>
        </div>
      </div>
    );
  }

}
