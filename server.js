var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    // req.headers obj will be either http or https, if it's https we will redirect to the http version of url
    res.redirect('http://' + req.hostname + req.url);
  } else {
    // otherwise we are using http so just continue normally
    next();
  }
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
