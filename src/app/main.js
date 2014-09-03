requirejs.config({
  baseUrl: 'js',
  paths: {
    'text': 'lib/text',
    'underscore': 'lib/underscore',
    'jquery': 'lib/jquery'
  },
  shim: {
    // add libraries that export global references here
    // see http://requirejs.org/docs/api.html#config-shim
  }
});

requirejs(['jquery', 'underscore'], function($, _){

  console.log('Hello, world!');

});