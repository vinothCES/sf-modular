module.exports = function() {
  'use strict';

  /*jshint -W069*/ 
  //fix for JSHINT issue with bowerFiles = ... statement

  var home = './',      
      modules = './modules/',

      wiredep = require('wiredep'),
      bowerFiles = wiredep({devDependencies: true})['js'],

      //object that gets exposed to gulpfile.js
      config = {

        /*file paths*/
        allFiles: home + '**/*.*',
        home: home,
        index: 'index.html',
        //ordered js files to be injected into index.html
        injectSrc: [
          modules + '**/*.module.js',
          modules + '**/*.controller.js',
          modules + '**/*.service.js',
          modules + '**/*.factory.js',
          modules + '**/*.directive.js',
          modules + '**/*.filter.js',
          modules + '**/*.constant.js',
          modules + '**/*.js'
        ],        
        moduleSrc: modules + '**/*.js',
        
        /*bower and NPM locations*/
        bower: {
          json: require('./bower.json'),
          directory: './bower_components',
          ignorePath: '../..'
        }

      };

  //
  //    Custom Methods
  //

  function getWiredepOptions() {
    var options = {
      bowerJson: config.bower.json,
      bowerDir: config.bower.directory,
      bowerIgnore: config.bower.ignorePath
    };
    return options;
  }

  config.getWiredepOptions = getWiredepOptions;
  
  return config;
};
