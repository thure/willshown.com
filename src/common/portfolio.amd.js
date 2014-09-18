define([
  'jquery',
  'underscore'
], function(
  $,
  _
){

  return new function(){
    var self = this
      , viels = {
      $page: $('section[data-page="portfolio"]'),
//      $splash: $('section[data-page="portfolio"] .splash'),
      $portfolio: $('section[data-page="portfolio"] .portfolio'),
//      $allUp: $('section[data-page="portfolio"] .portfolio section.portfolio_all-up'),
//      $oneUp: $('section[data-page="portfolio"] .portfolio section.portfolio_one-up')
    };

    this.open = function(){
      viels.$page.attr('data-displaying', 'portfolio');
    };

    this.portfolioView = function(view){
      viels.$portfolio.attr('data-displaying', view);
    }

  };

});