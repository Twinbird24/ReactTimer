var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: 'stopped'
    }
  },
  // gets called after either props or state get updated
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      // if current state is different from previous state, let's do stuff
      switch (this.state.countdownStatus) {
        // if status is started, start the timer
        case 'started':
          this.startTimer();
          break;
      }
    }
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      // this code will run every second (1000)
      // subtract 1, then update the count state
      var newCount = this.state.count - 1;
      this.setState({
        // if new count is greater than or equal to 0 then we update, otherwise we are at 0
        count: newCount >= 0 ? newCount : 0
      });
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  render: function() {
    var {count} = this.state;
    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountDown={this.handleSetCountdown}/>
      </div>
    );
  }
});

module.exports = Countdown;
