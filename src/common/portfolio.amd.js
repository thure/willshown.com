define([
  'jquery',
  'underscore'
], function(
  $,
  _
){

  return new function(){
    var self = this;

    this.open = function(){
      console.log('Portfolio open!');
    }

  };

});