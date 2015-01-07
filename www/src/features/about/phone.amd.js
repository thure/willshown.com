define([], function(){

  return function(e){
    e.preventDefault();

    if(
      window.confirm("Please only call if I'm expecting a call from you. Do you still want to place a call?")
    ){
      window.location.href = 'tel:+17073569455'
    }

  }

});