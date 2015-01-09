define([
  'jquery',
  'underscore',
  'q',
  'config/portfolio',
  'amd/sci',
  'amd/is-mobile',
  'text!amd/all-up.ejs',
  'text!amd/one-ups.ejs'
], function(
  $, _, q, portfolio, sci, isMobile, allUpEJS, oneUpsEJS
){

  return new function(){
    var self = this
      , geof = null
      , viels = {
          $main:      $('body > main'),
          $nav:       $('body > nav.main'),
          $page:      $('section[data-page="portfolio"]'),
          $portfolio: $('section[data-page="portfolio"] div.portfolio'),
          $allUp:     $('section[data-page="portfolio"] div.portfolio section.all-up')
        }
      , allUpT = _.template(allUpEJS)
      , oneUpsT = _.template(oneUpsEJS);

    var stopVideos = function(){
      $('video.playing').each(function(){
        this.pause();
        this.currentTime = 0;
        this.classList.remove('playing');
      });
    };

    var toggleVideo = function(section){
      var $section = section ? viels.$portfolio.find('[data-for="'+section+'"]') : viels.$portfolio.find('.one-up.active')
        , $vid = $section.find('.viewport:nth-child('+$section.attr('data-active')+')').find('video');
      if($vid.length > 0 ) {
        if ($vid.hasClass('playing')) {
          $vid.removeClass('playing')[0].pause();
          $vid[0].currentTime = 0;
        } else {
          $vid.addClass('playing')[0].play();
        }
      }else if(!_.isNull(geof)){
        if($section.find('.viewport:nth-child('+$section.attr('data-active')+')').find('canvas').length > 0){
          geof.start();
        }else{
          geof.pause();
        }
      }
    };

    this.render = function(){
      var $allUp = $(allUpT({portfolio: portfolio}))
        , $oneUps = $(oneUpsT({portfolio: portfolio, isMobile: isMobile}));
      viels.$allUp.html($allUp);
      viels.$portfolio.append($oneUps);
      self.bind({
        $allUp: $allUp,
        $oneUps: $oneUps
      });
    };

    this.bind = function(els){
      sci.then(function(i) {

        els.$allUp.on('click touchstart', 'a.portfolio-item', function ($e) {
          var name = $e.target.hasAttribute('data-name') ?
            $e.target.getAttribute('data-name') :
            $($e.target).parents('[data-name]').attr('data-name');
          i.gen({
            name: 'down',
            data: name
          });
        });

        viels.$portfolio.find('button.up').on('click touchstart', function($e){
          i.gen('up');
        });

        els.$oneUps.on('click touchstart', 'a[data-i]', function($e){
          var i = $e.target.getAttribute('data-i')
            , $active = $($e.target).parents('[data-active]');
          if(i !== $active.attr('data-active')){
            toggleVideo();
            $active.attr('data-active', i);
            toggleVideo();
          }
        });

        if(!isMobile){
          requirejs(['amd/geof'], function(geofCanvas){

            geof = geofCanvas;
            geof.bind($('#geof-canvas')[0]);

          })
        }

      });
    };

    this.open = function(){
      viels.$page.attr('data-displaying', 'portfolio');
    };

    this.portfolioView = function(view, section){
      viels.$portfolio.find('.active[data-for]').removeClass('active');
      viels.$portfolio.attr('data-displaying', view);
      switch(view){
        case 'all-up':
          viels.$allUp[0].scrollTop = 0;
          viels.$main.addClass('start-all-up');
          break;
        case 'one-up':
          viels.$main.addClass('start-one-up');
          viels.$portfolio.find('[data-for="'+section+'"]').addClass('active');
          toggleVideo(section);
      }
    };

    this.exit = function(view){
      switch(view){
        case 'all-up':
          viels.$main.removeClass('start-all-up');
          break;
        case 'one-up':
          viels.$main.removeClass('start-one-up');
          stopVideos();
          break;
      }
    };

    (function(){
      self.render();
    }())

  };

});