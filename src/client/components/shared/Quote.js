import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';

const displayName = 'Quote';

export default class Quote extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    quotes: PropTypes.shape({
      interesting: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      funny: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }).isRequired
  };

  static defaultProps = {
    category: 'funny',
    quotes: {
      interesting: [
        "Did you know 8% of people have an extra rib?"
      ],
      funny: [
        "Don't scare me! I poop easily.",
        "Don't think of yourself as an ugly person. Think of yourself as a beautiful monkey.",
        "When someone calls you at 3 AM asking if you're awake. \"No, I'm skydiving...\"",
        "With great power comes great eletricity bill.",
        "Raisin cookies pretending to be chocolate chip cookies are the reason I have trust issues.",
        "All my life I thought air was free... Until I opened a bag of chips.",
        "Nooooooo, she wasn't ready."
      ]
    }
  };

  render() {
    const {className, category, quotes} = this.props;
    const classes = classNames(displayName, className);

    return (
      <span className={classes}>
        {_.sample(quotes[category])}
      </span>
    );
  }
}
