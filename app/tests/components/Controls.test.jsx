var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', () => {
  it('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', () => {
    // test to make sure the pause button renders when the timer is started
    it('should render pause when started', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      //:contains lets you check the text value
      var $pauseButton = $el.find('button:contains(Pause)');

      // assert that a button was found with a value of Pause
      // length property on jQuery selector is equal to the number of items it found
      expect($pauseButton.length).toBe(1);
    });

    it('should render start when paused', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      //:contains lets you check the text value
      var $startButton = $el.find('button:contains(Start)');

      // assert that a button was found with a value of Pause
      // length property on jQuery selector is equal to the number of items it found
      expect($startButton.length).toBe(1);
    });
  });
});
