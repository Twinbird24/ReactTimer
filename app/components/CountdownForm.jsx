var React = require('react');

var CountdownForm = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();
    var strSeconds = this.refs.seconds.value;

    // make sure input is only numbers, if not match will return null
    if (strSeconds.match(/^[0-9]*$/)) {
      this.refs.seconds.value = ''; //clear the input
      this.props.onSetCountDown(parseInt(strSeconds, 10)); //the 10 represent the base, we want base 10
    }
  },
  render: function () {
    return (
      <div>
        <form ref="form" onSubmit={this.onSubmit} className="countdown-form">
          <input type="text" ref="seconds" placeholder="Enter time in seconds"/>
          <button className="button expanded">Start</button>
        </form>
      </div>
    );
  }
});

module.exports = CountdownForm;
