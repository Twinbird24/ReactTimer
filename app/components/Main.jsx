var React = require('react');
var Navigation = require('Navigation');

var Main = (props) => {
  return (
    <div>
      <div>
        <div>
          <Navigation/>
          {/* render the nested Routes/ componenets of Main inside of app.jsx*/}
          {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
