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

requirejs(['jquery', 'underscore', 'amd/loader', 'amd/sci', 'amd/portfolio'], function($, _, loader, sci, portfolio){

  var ready = function(i){
    i.gen({
      name: 'ready',
      data: portfolio
    });
  };

  sci.then(ready);

  $('i.loading').find('button').on('click', function($e){
    sci.then(function(i){ i.gen('open-portfolio'); });
  });

  $('nav.main a').on('click', function($e){
    $e.preventDefault();
    var href = $e.target.getAttribute('href').replace(/^#/, '');
    document.body.setAttribute('data-displaying', href);
  });

});