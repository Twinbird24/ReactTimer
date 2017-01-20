var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: 'stopped'
    }
  },
  // gets called after either props or state get updated - component will update will get fired before this
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      // if current state is different from previous state, let's do stuff
      switch (this.state.countdownStatus) {
        // if status is started, start the timer
        // leaving no break between stopped and causes causes both to run, i.e. stopping resets the count and clears the timer,
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
      // subtract 1, then update the count state
      var newCount = this.state.count - 1;
      this.setState({
        // if new count is greater than or equal to 0 then we update, otherwise we are at 0
        count: newCount >= 0 ? newCount : 0
      });

      // check if we reached 0, and if so, stop running the interval every second
      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function (newStatus) {
    this.setState({
      countdownStatus: newStatus
    });
  },
  render: function() {
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        // must be started or paused, so render controls
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
        // ^ by passing a function down as a prop, we can wait for actions to get fired on the children and then do something
        // with those, in thise case we change the countdownStatus
      } else {
        return <CountdownForm onSetCountDown={this.handleSetCountdown}/>;
      }
    }
    return (
      <div>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
