var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Clock = require('Clock');

// describe lets us group our test and name that group
describe('Clock', () => {
  it('should exist', () => {
    expect(Clock).toExist();
  });

  describe('render', () => {
    it('should render clock to output', () => {
      var clock = TestUtils.renderIntoDocument(<Clock totalSeconds={62}/>);
      // this will store the root of our component in terms of the DOM
      // ReactDOM.findDOMNode(clock) convert our component into the actual HTML thats rendered to the browser, then we pass that to jQuery
      // and set it equal to $el
      var $el = $(ReactDOM.findDOMNode(clock));
      var actualText = $el.find('.clock-text').text(); // pull the text value from the span tag inside the clock component

      expect(actualText).toBe('01:02'); // we passed into 62 seconds, we should get this output
    });
  });

  describe('formatSeconds', () => {
    it('should format seconds', () => {
      // lets us render our component, and it will return it back, into clock, so we can do stuff with it
      var clock = TestUtils.renderIntoDocument(<Clock/>);
      var seconds = 615; // 10 min 15 seconds
      var expected = '10:15';
      var actual = clock.formatSeconds(seconds); //run the method

      expect(actual).toBe(expected); // test the actual method results to the expected, defined above
    });
  });

  describe('formatSeconds', () => {
    it('should format seconds when min/sec are less than 10', () => {
      // lets us render our component, and it will return it back, into clock, so we can do stuff with it
      var clock = TestUtils.renderIntoDocument(<Clock/>);
      var seconds = 61; // 1 min 1 second
      var expected = '01:01';
      var actual = clock.formatSeconds(seconds); //run the method

      expect(actual).toBe(expected); // test the actual method results to the expected, defined above
    });
  });
});
