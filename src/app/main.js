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

  var $loading = $('i.loading')
    , $button = $loading.find('button')
    , interval = 100
    , delta = 2
    , duration = interval * ((100/delta) + 1)
    , increment = setInterval(function(){
      $loading.attr('data-loaded', parseInt($loading.attr('data-loaded')) + delta)
    }, interval);
  setTimeout(function(){
    clearInterval(increment);
    $button.prop('disabled', false);
  }, duration);

});