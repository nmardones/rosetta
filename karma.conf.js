'use strict';
var webpack = require('webpack');

module.exports = function(karma) {
  karma.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'test/**/*Spec.js'
    ],

    reporters: ['spec'],

    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },

    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],

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

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
        'karma-mocha',
        'karma-webpack',
        'karma-chrome-launcher',
        'karma-spec-reporter'
    ]

  });
};
