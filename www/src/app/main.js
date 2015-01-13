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
    'async': 'lib/async',
    'EventEmitter': 'lib/EventEmitter',
    'GA': 'lib/GoogleAnalytics'
  },
  config: {
    'GA': {
      id: 'UA-58535535-1'
    }
  }
});

requirejs([
  'async',
  'jquery',
  'q',
  'underscore',
  'GA',
  'amd/detect-features',
  'amd/loader',
  'amd/sci',
  'amd/nav-main',
  'amd/portfolio',
  'amd/about',
  'amd/phone'
], function(async, $, q, _, GA, detectFeatures, loader, sci, nav, portfolio, about, dialPhone){

  window.dialPhone = dialPhone;

  GA.view({
    page: '/'
  });

  var domReady = q.defer();

  $(function(){
    domReady.resolve();
    nav.bind();
    portfolio.render();
    about.render();
    detectFeatures();
  });

  sci.then(function(interpreter){
    interpreter.gen({
      name: 'ready',
      data: portfolio
    });
  });

  q.all([domReady.proimse, sci]).then(function(results){
    var interpreter = results[1];
    loader.bind(interpreter);
  });

});