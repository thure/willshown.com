define(['jquery', 'underscore', 'config/portfolio'], function($, _, portfolio){

  function Loader(){

    var total = 0
      , loaded = 0
      , names = {}
      , weights = {
        image: 2,
        video: 8
      }
      , $loading = $('.splash i.loading');

    _.each(portfolio, function(pi, name){
      _.each(pi, function(pips, name){
        switch(pips.asset.type){
          case 'image':
            total += weights.image;
            break;
          case 'video':
            total += weights.video;
            break;
        }
      });
    });

    var update = function(){
      var metric = Math.min(Math.round((loaded / total * 50)) * 2, 100);
      console.log( metric );
      $loading.attr('data-loaded', metric);
    };

    var add = function(e){
      var type = e.target.tagName.toLowerCase()
        , name = e.target.getAttribute('data-name');

      if(name && !_.has(names, name)){
        names[name] = true;

        switch(type) {
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

    var pause = function(e){
      e.target.pause();
      e.target.currentTime = 0;
    };

    (function(){

      document.addEventListener('load', add, true);
      document.addEventListener('canplaythrough', add, true);
      document.addEventListener('play', pause, true);

    }())
  }

  return new Loader();

});