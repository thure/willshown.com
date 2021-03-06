define(['jquery', 'underscore', 'amd/sci', 'config/portfolio'], function ($, _, sci, portfolio) {

  function Loader() {

    var total = 0
      , loaded = 0
      , names = {}
      , weights = {
          image: 2,
          video: 8
        }
      , $loading;

    this.bind = function () {

      $loading = $('.splash i.loading');

      $loading.find('button').on('click', function ($e) {
        sci.gen('open-portfolio');
      });
    };

    _.each(portfolio, function (pi, name) {
      _.each(pi, function (pips, name) {
        names[name] = false;
        switch (pips.asset.type) {
          case 'image':
            total += weights.image;
            break;
          case 'video':
            total += weights.video;
            break;
        }
      });
    });

    var update = _.throttle(function () {
      var metric = Math.min(Math.round((loaded / total * 50)) * 2, 100);
      console.log(metric);
      if ($loading) $loading.attr('data-loaded', metric);
      if (metric === 100) {
        if ($loading) $loading.addClass('loaded').find('button').prop('disabled', false);
        document.removeEventListener('play', pause, true);
      }
    }, 400);

    var add = function (e) {
      var type = e.target.tagName.toLowerCase()
        , name = e.target.getAttribute('data-name');

      if (name && !_.has(names, name) && !names[name]) {
        names[name] = true;

        switch (type) {
          case 'img':
            loaded += weights.image;
            break;
          case 'video':
            loaded += weights.video;
            break;
        }

        update();
      }
    };

    var pause = function (e) {
      e.target.pause();
      e.target.currentTime = 0;
    };

    (function () {

      document.addEventListener('load', add, true);
      document.addEventListener('canplaythrough', add, true);
      document.addEventListener('play', pause, true);

      // in case something isn't working, we'll assume the best.

      _.delay(function () {
        loaded = Infinity;
        update();
      }, 10e3);

    }())
  }

  return new Loader();

});