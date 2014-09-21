requirejs.config({
  baseUrl: 'js',
  paths: {
    'text': 'lib/text',
    'q': 'lib/q',
    'underscore': 'lib/underscore',
    'jquery': 'lib/jquery',
    'scion': 'lib/scion'
  },
  shim: {
    // add libraries that export global references here
    // see http://requirejs.org/docs/api.html#config-shim
  }
});

requirejs(['jquery', 'underscore', 'amd/sci', 'amd/portfolio'], function($, _, sci, portfolio){

  var ready = function(i){
    i.gen({
      name: 'ready',
      data: portfolio
    });
  };

  sci.then(ready);

  var $loading = $('i.loading')
    , $button = $loading.find('button')
    , interval = 100
    , delta = 2
    , duration = interval * ((100/delta) + 1)
    , increment = setInterval(function(){
      $loading.attr('data-loaded', Math.min(parseInt($loading.attr('data-loaded')) + delta, 100))
    }, interval);
  setTimeout(function(){
    clearInterval(increment);
    $button.prop('disabled', false);
  }, duration);

  $button.on('click', function($e){
    sci.then(function(i){ i.gen('open-portfolio'); });
  });

  $('nav.main a').on('click', function($e){
    $e.preventDefault();
    var href = $e.target.getAttribute('href').replace(/^#/, '');
    document.body.setAttribute('data-displaying', href);
  });

});