define([
  'jquery',
  'underscore',
  'amd/fetch-cards'
], function(
  $, _, fetchCards
){

  function Router(){
    var self = this
      , hash = function(){
        return window.location.hash.replace(/^#/, '');
      };

    this.navigate = function(p){
      var path = p || hash();
      console.log('Navigate to: ' + path);
      fetchCards();
    };

    (function(){

      $(window).on('popstate hashchange', _.debounce(function($e){
        self.navigate(hash());
      }, 200, true));

    }());

  }

  return new Router();

});