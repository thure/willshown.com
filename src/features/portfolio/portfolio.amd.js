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
          $nav:       $('body > nav.main'),
          $page:      $('section[data-page="portfolio"]'),
          $portfolio: $('section[data-page="portfolio"] div.portfolio'),
          $allUp:     $('section[data-page="portfolio"] div.portfolio section.all-up')
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
        viels.$portfolio.find('button.up').on('click touchstart', function($e){
          i.gen('up');
        });
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