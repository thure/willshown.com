requirejs.config({
  baseUrl: 'js',
  paths: {
    'text': 'lib/text',
    'q': 'lib/q',
    'underscore': 'lib/underscore',
    'jquery': 'lib/jquery',
    'moment': 'lib/moment',
    'scion': 'lib/scion'
  }
});

requirejs([
  'jquery',
  'underscore',
  'amd/loader',
  'amd/sci',
  'amd/nav-main',
  'amd/portfolio',
  'amd/about',
  'amd/phone'
], function($, _, loader, sci, nav, portfolio, about, dialPhone){

  window.dialPhone = dialPhone;

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

});