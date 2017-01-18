// the webpack variable is used in the plugins array. We use webpack.ProvidePlugin to configure jQuery.
var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js', //sciprt! makes sure files are packaged for webpack
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery' // key is module name, value is var name we want availabe in our external script files, this way foundation can properly attach its methods to jQuery object
  },
  plugins: [
    // so we don't have to require jquery on every page, if we use these key words, the jquery module will be automatically required
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      applicationStyles: 'app/styles/app.scss',
      Navigation: 'app/components/Navigation.jsx',
      Countdown: 'app/components/Countdown.jsx',
      Timer: 'app/components/Timer.jsx',
      Clock: 'app/components/Clock.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'eval-source-map'
};
