var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      timerStatus: 'stopped'
    }
  },
  // gets called after either props or state get updated - component will update will get fired before this
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.timerStatus !== prevState.timerStatus) {
      // if current state is different from previous state, let's do stuff
      switch (this.state.timerStatus) {
        // if status is started, start the timer
        // leaving no break between stopped and paused causes both to run, i.e. stopping resets the count and clears the timer,
        // pause only stops the timer, and leaves count where it is
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0}) // count reset to 0
        case 'paused':
          clearInterval(this.timer) //clear the timer we have in startTimer below, count will be left alone
          this.timer = undefined;
          break;
      }
    }
  },
  // this gets fired by react right before our component gets removed from the DOM
  componentWillUnmount: function () {
    clearInterval(this.timer); // stop timer
    this.timer = undefined; // clear up the variable
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      // this code will run every second (1000)
      // adding 1 each time, updating count state
      this.setState({
        // set count to the count plus 1
        count: this.state.count + 1
      });
    }, 1000);
  },
  handleStatusChange: function (newStatus) {
    this.setState({
      timerStatus: newStatus
    });
  },
  render: function () {
    var {count, timerStatus} = this.state;

    return (
      <div>
        <h2 className="page-title">Timer App</h2>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;
