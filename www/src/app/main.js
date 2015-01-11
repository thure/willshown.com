requirejs.config({
  baseUrl: 'js',
  paths: {
    'text': 'lib/text',
    'q': 'lib/q',
    'ajax': 'lib/qxhr',
    'underscore': 'lib/underscore',
    'jquery': 'lib/jquery',
    'moment': 'lib/moment',
    'scion': 'lib/scion',
    'async': 'lib/async'
  }
});

requirejs([
  'async',
  'jquery',
  'q',
  'underscore',
  'amd/detect-features',
  'amd/loader',
  'amd/sci',
  'amd/nav-main',
  'amd/portfolio',
  'amd/about',
  'amd/phone'
], function(async, $, q, _, detectFeatures, loader, sci, nav, portfolio, about, dialPhone){

  window.dialPhone = dialPhone;

  var ready = function(i){
    i.gen({
      name: 'ready',
      data: portfolio
    });

    $('i.loading').find('button').on('click', function($e){
      i.gen('open-portfolio');
    });
  };

  $(function(){
    detectFeatures();
    sci.then(ready);
  });

});