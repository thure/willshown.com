requirejs.config({
  baseUrl: 'js',
  paths  : {
    'text'        : 'lib/text',
    'q'           : 'lib/q',
    'ajax'        : 'lib/qxhr',
    'underscore'  : 'lib/underscore',
    'jquery'      : 'lib/jquery',
    'moment'      : 'lib/moment',
    'scion'       : 'lib/scion',
    'async'       : 'lib/async',
    'EventEmitter': 'lib/EventEmitter',
    'GA'          : 'lib/GoogleAnalytics'
  },
  config : {
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
], function (async, $, q, _, GA, detectFeatures, loader, sci, nav, portfolio, about, dialPhone) {

  window.dialPhone = dialPhone;
  window.pageErrors = 0;
  window.outboundLinks = 0;

  GA.ready(function (ga) {
    ga('set', 'dimension1', 'OutboundURL');
  });

  GA.view({page: '/'});

  var trackLink = function (e) {
    GA.event('link', 'activate', 'outbound links', window.outboundLinks++);
  };

  $(function () {
    loader.bind();
    nav.bind();
    portfolio.render(trackLink);
    about.render(trackLink);
    detectFeatures();
  });

  sci.ready.then(function (interpreter) {
    interpreter.gen({
      name: 'ready',
      data: portfolio
    });
  });

  requirejs.onError = function (err) {
    GA.event('error', 'occurred', 'errors', window.pageErrors++, {
      'exDescription': 'Require: ' + err.requireType + '; ' + err.requireModules.join(', ') + '.',
      'exFatal'      : true
    });
  };

});