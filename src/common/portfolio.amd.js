define([
  'jquery',
  'underscore',
  'q',
  'config/portfolio',
  'text!amd/all-up.ejs',
  'text!amd/one-ups.ejs'
], function(
  $, _, q, portfolio, allUpEJS, oneUpsEJS
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
      viels.$allUp.html(allUpT({portfolio: portfolio}));
      viels.$portfolio.append(oneUpsT({portfolio: portfolio}));
    };

    this.open = function(){
      viels.$page.attr('data-displaying', 'portfolio');
    };

    this.portfolioView = function(view){
      viels.$portfolio.attr('data-displaying', view);
      switch(view){
        case 'all-up':
          viels.$main.addClass('start-all-up');
          break;
      }
    };

    this.exit = function(view){
      switch(view){
        case 'all-up':
          viels.$main.removeClass('start-all-up');
          break;
      }
    };

    (function(){
      self.render();
    }())

  };

});