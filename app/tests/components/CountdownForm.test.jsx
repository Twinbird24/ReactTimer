var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var CountdownForm = require('CountdownForm');

describe('CountdownForm', () => {
  it('should exist', () => {
    expect(CountdownForm).toExist();
  });

  it('should call onSetCountdown if valid seconds entered', () => {
    // create a spy, we use a spy to check weather or not a function has been called
    var spy = expect.createSpy();
    // render the CountdownForm component, passing in the spy
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountDown={spy}/>);
    // ReactDOM.findDOMNode(countdownForm) converts our component into the actual HTML thats rendered to the browser, then we pass that to jQuery
    // and set it equal to $el
    var $el = $(ReactDOM.findDOMNode(countdownForm));

    // set the seconds that would be entered, we are testing for valid input, so we will enter valid value
    countdownForm.refs.seconds.value = '109';
    // simulate a submit of the value, we need to pass in the DOM node of the form in the submit method, .find('form')[0] pulls out the
    // form, [0] pulls out the first DOM node aka the form
    TestUtils.Simulate.submit($el.find('form')[0]);

    // assert the spy has been called: basically we pass the int 109 and the funciton should have been called, with no errors,
    // that's all we are testing here
    expect(spy).toHaveBeenCalledWith(109);
  });

  it('should not call onSetCountdown if invalid input entered', () => {
    // create a spy, we use a spy to check weather or not a function has been called
    var spy = expect.createSpy();
    // render the CountdownForm component, passing in the spy
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountDown={spy}/>);
    // ReactDOM.findDOMNode(countdownForm) converts our component into the actual HTML thats rendered to the browser, then we pass that to jQuery
    // and set it equal to $el
    var $el = $(ReactDOM.findDOMNode(countdownForm));

    // set the seconds that would be entered, we are testing for invalid input, so we will enter invalid value
    countdownForm.refs.seconds.value = 'aQ'; //arbitrary value, could have been empty string, or another random letter
    // simulate a submit of the value, we need to pass in the DOM node of the form in the submit method, .find('form')[0] pulls out the
    // form, [0] pulls out the first DOM node aka the form
    TestUtils.Simulate.submit($el.find('form')[0]);

    // assert the spy has been not been called: basically we pass the 'aQ' and the funciton should not have been called,
    // because the input is not valid
    expect(spy).toNotHaveBeenCalled();
  });
});
