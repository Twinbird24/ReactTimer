var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Countdown = require('Countdown');

describe('Countdown', () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleSetCountdown', () => {
    // adding in 'done' tells mocha we are running an asyn test, and it will wait until done is called to stop the test
    it('should set state to started and count down', (done) => {
      // store an instance of the Countdown component and start it's handleSetCountdown method, from 10 seconds
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');

      // make sure count is 1 less after just over a second
      setTimeout(() => {
        expect(countdown.state.count).toBe(9);
        done();
      }, 1001);
    });

    it('should never set count less than zero', (done) => {
      // store an instance of the Countdown component and start it's handleSetCountdown method, from 10 seconds
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(1);

      // make sure count is still 0 just after 3 seconds has passed
      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        done();
      }, 3001);
    });

    it('should pause countdown on paused status', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(3); // set count to 3 and start the interval
      // below is handler that gets called when a button gets pressed, we can use it to trigger paused status
      countdown.handleStatusChange('paused');

      // make sure that when timer is paused, the count doesn't change after time passes
      setTimeout(() => {
        expect(countdown.state.count).toBe(3);
        expect(countdown.state.countdownStatus).toBe('paused');
        done();
      }, 1001);
    });

    it('should reset count on stopped', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(3); // set count to 3 and start the interval
      // below is handler that gets called when a button gets pressed, we can use it to trigger paused status
      countdown.handleStatusChange('stopped');

      // make sure that timer is stopped and the count is reset
      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        expect(countdown.state.countdownStatus).toBe('stopped');
        done();
      }, 1001);
    });
  });
});
