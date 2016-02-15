require('dotenv').config();
var fs = require('fs');

module.exports = function(config) {

  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_InternetExplorer': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    'SL_FireFox': {
      base: 'SauceLabs',
      browserName: 'firefox',
    }
  };

  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'test/**/*Spec.js'
    ],

    reporters: ['spec', 'saucelabs'],

    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },

    webpack : {
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          },
          {
            test: /\.scss$/,
            loader: "style!css!sass"
          }]
      }
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'Rosetta testing',
      passed: "true",
      build: "build-1234"
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    browsers: Object.keys(customLaunchers),
    singleRun: true,
    plugins: [
        'karma-mocha',
        'karma-webpack',
        'karma-spec-reporter',
        'karma-sauce-launcher'
    ]
  });
};
