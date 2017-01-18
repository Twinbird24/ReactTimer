var React = require('react');

var Clock = React.createClass({
  getDefaultProps: function() {
    // if nothing gets passed in, we'll just default to 0 seconds
    totalSeconds: 0
  },
  PropTypes: {
    totalSeconds: React.PropTypes.number
  },
  formatSeconds: function (totalSeconds) {
    var seconds = totalSeconds%60;
    var minutes = Math.floor(totalSeconds/60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
  },
  render: function() {
    var {totalSeconds} = this.props;
    return (
      <div className="clock">
        <span className="clock-text">
          {/*formatSeconds will return a string, which will get rendered in the span*/}
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    )
  }
});

module.exports = Clock;
