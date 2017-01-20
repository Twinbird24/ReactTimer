var React = require('react');

var Controls = React.createClass({
  PropTypes: {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  },
  onStatusChange: function (newStatus) {
    return () => {
      // trigger onStatusChange method of parent component (will be passed paused, started, or stopped)
      this.props.onStatusChange(newStatus);
    }
  },
  render: function () {
    var {countdownStatus} = this.props;
    var renderStartStopButton = () => {
      if (countdownStatus === 'started') {
        return <button className="button secondary" onClick={this.onStatusChange('paused')}>Pause</button>
      } else if (countdownStatus === 'paused') {
        return <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
      }
    }

    return (
      <div className="controls">
        {renderStartStopButton()}
        {/*the onClick must return another funcion, otherwise this.props.onStatusChange get called right away, not when
        the button gets clicked. The return value from the function is what will get called every time the button gets clicked*/}
        <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>Clear</button>
      </div>
    );
  }
});

module.exports = Controls;
