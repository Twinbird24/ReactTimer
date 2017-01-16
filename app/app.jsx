var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

// load foundation, require doesn't know how to load css files, so we use css-loader css!, we also need to inject this into
// our html so our styles actually show up, using style!
require('style!css!foundation-sites/dist/foundation.min.css');
// fire up foundation, by calling the foundation method
$('document').foundation();

// app css, also has the sass loader prepended
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    </Route>
  </Router>,
  document.getElementById('app')
);
