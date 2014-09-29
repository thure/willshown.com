define([
  'jquery',
  'underscore',
  'q',
  'config/portfolio',
  'amd/sci',
  'text!amd/all-up.ejs',
  'text!amd/one-ups.ejs'
], function(
  $, _, q, portfolio, sci, allUpEJS, oneUpsEJS
){

  return new function(){
    var self = this
      , viels = {
          $main:      $('body > main'),
          $page:      $('section[data-page="portfolio"]'),
          $portfolio: $('section[data-page="portfolio"] .portfolio'),
          $allUp:     $('section[data-page="portfolio"] .portfolio section.all-up')
        }
      , allUpT = _.template(allUpEJS)
      , oneUpsT = _.template(oneUpsEJS);

    this.render = function(){
      var $allUp = $(allUpT({portfolio: portfolio}))
        , $oneUps = $(oneUpsT({portfolio: portfolio}));
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
      });
    };

    this.open = function(){
      viels.$page.attr('data-displaying', 'portfolio');
    };

    this.portfolioView = function(view, section){
      viels.$portfolio.attr('data-displaying', view);
      switch(view){
        case 'all-up':
          viels.$main.addClass('start-all-up');
          break;
        case 'one-up':
          viels.$main.addClass('start-one-up');
          console.log('Opening ' + section);
      }
    };

    this.exit = function(view, exitingTo){
      switch(view){
        case 'all-up':
          viels.$main.removeClass('start-all-up');
          console.log('Exiting to ' + exitingTo);
          break;
      }
    };

    (function(){
      self.render();
    }())

  };

});