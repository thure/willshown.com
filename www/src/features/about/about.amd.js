define([
  'jquery',
  'underscore',
  'config/about',
  'text!amd/about.ejs'
], function($, _, aboutJSON, aboutEJS){

  return new function(){
    var self = this,
        temp = _.template(aboutEJS);

    this.render = function(){
      var $el = $(temp(aboutJSON));
      $('body > main > section[data-page="about"]').append($el);
      this.bind($el);
    };

    this.bind = function($el){
      this.$el = $el;
    };

    (function(){
      self.render();
    }())

  };

});