define(['underscore'], function(_){

  var test = {
    'background-blend-mode': [
      'background-blend-mode'
    ]
  };

  return function(){
    var el = document.createElement('i');

    _.each(test, function(props, name){
      if(_.find(props, function(prop){
        return prop in el.style;
      })){
        document.documentElement.classList.add('has-' + name);
      }else{
        document.documentElement.classList.add('no-' + name);
      }
    });

  }

});