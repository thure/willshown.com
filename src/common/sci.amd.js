define(['q', 'scion', 'text!amd/portfolio.scxml'], function(q, scion, scxml){

  var d = q.defer();

  scion.documentStringToModel(scxml,function(err, model){
    if(err){
      d.reject(err);
    }else{

      var interpreter = new scion.SCXML(model);
      interpreter.start();

      d.resolve(interpreter);

    }
  });

  return d.promise;

});