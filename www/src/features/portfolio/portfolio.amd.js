define([
  'jquery',
  'underscore',
  'q',
  'GA',
  'config/portfolio',
  'amd/sci',
  'amd/is-mobile',
  'text!amd/all-up.ejs',
  'text!amd/one-ups.ejs'
], function ($, _, q, GA, portfolio, sci, isMobile, allUpEJS, oneUpsEJS) {

  return new function () {
    var self = this,
        geof = null,
        viels = null,
        allUpT = _.template(allUpEJS),
        oneUpsT = _.template(oneUpsEJS),
        up = 0,
        down = 0;

    var stopVideos = function () {
      $('video.playing').each(function () {
        this.pause();
        this.currentTime = 0;
        this.classList.remove('playing');
      });
    };

    var toggleVideo = function (section) {
      if (!isMobile) {
        var $section = section ? viels.$portfolio.find('[data-for="' + section + '"]') : viels.$portfolio.find('.one-up.active')
          , $vid = $section.find('.viewport:nth-child(' + $section.attr('data-active') + ')').find('video');
        if ($vid.length > 0) {
          if ($vid.hasClass('playing')) {
            $vid.removeClass('playing')[0].pause();
            $vid[0].currentTime = 0;
          } else {
            $vid.addClass('playing')[0].play();
          }
        } else if (!_.isNull(geof)) {
          if ($section.find('.viewport:nth-child(' + $section.attr('data-active') + ')').find('canvas').length > 0) {
            geof.start();
          } else {
            geof.pause();
          }
        }
      }
    };

    this.render = function (trackLink) {
      viels = {
        $main     : $('body > main'),
        $nav      : $('body > nav.main'),
        $page     : $('section[data-page="portfolio"]'),
        $portfolio: $('section[data-page="portfolio"] div.portfolio'),
        $allUp    : $('section[data-page="portfolio"] div.portfolio section.all-up')
      };

      var $allUp = $(allUpT({portfolio: portfolio}))
        , $oneUps = $(oneUpsT({portfolio: portfolio, isMobile: isMobile}));

      viels.$allUp.html($allUp);

      viels.$portfolio.append($oneUps);

      self.bind(trackLink, {
        $allUp : $allUp,
        $oneUps: $oneUps
      });
    };

    this.bind = function (trackLink, els) {

      els.$allUp.on('click touchstart', 'a.portfolio-item', function ($e) {
        $e.preventDefault();

        var name = $e.target.hasAttribute('data-name') ?
          $e.target.getAttribute('data-name') :
          $($e.target).parents('[data-name]').attr('data-name');

        sci.gen({
          name: 'down',
          data: name
        });
      });

      viels.$portfolio.find('button.up').on('click touchstart', function ($e) {
        sci.gen('up');
      });

      els.$oneUps.on('click touchstart', 'a[data-i]', function ($e) {
        $e.preventDefault();

        var i = $e.target.getAttribute('data-i')
          , $active = $($e.target).parents('[data-active]');

        if (i !== $active.attr('data-active')) {
          toggleVideo();
          $active.attr('data-active', i);
          toggleVideo();
        }
      });

      els.$allUp.on('click touchstart', 'a[href^="http"]', trackLink);
      els.$oneUps.on('click touchstart', 'a[href^="http"]', trackLink);

      if (!isMobile) {
        requirejs(['amd/geof'], function (geofCanvas) {

          geof = geofCanvas;
          geof.bind(els.$oneUps.find('#geof-canvas')[0]);

        })
      }
    };

    this.open = function () {
      viels.$page.attr('data-displaying', 'portfolio');
      GA.event('button', 'activate', 'interaction', up++, {page: '/portfolio'});
      GA.view({page: '/portfolio'});
    };

    this.portfolioView = function (view, section) {
      viels.$portfolio.find('.active[data-for]').removeClass('active');
      viels.$portfolio.attr('data-displaying', view);
      switch (view) {
        case 'all-up':
          viels.$allUp[0].scrollTop = 0;
          viels.$main.addClass('start-all-up');
          break;
        case 'one-up':
          viels.$main.addClass('start-one-up');
          viels.$portfolio.find('[data-for="' + section + '"]').addClass('active');
          toggleVideo(section);
          GA.event('button', 'activate', 'interaction', down++, {page: '/portfolio/' + section});
          GA.view({page: '/portfolio/' + section});
      }
    };

    this.exit = function (view) {
      switch (view) {
        case 'all-up':
          viels.$main.removeClass('start-all-up');
          break;
        case 'one-up':
          viels.$main.removeClass('start-one-up');
          stopVideos();
          GA.event('button', 'activate', 'interaction', up++, {page: '/portfolio'});
          GA.view({page: '/portfolio'});
          break;
      }
    };

  };

});