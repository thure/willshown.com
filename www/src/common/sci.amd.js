define(['q', 'scion', 'text!amd/portfolio.scxml'], function(q, scion, portfolioSCXML){

  var d = q.defer();

  scion.documentStringToModel(portfolioSCXML,function(err, model){
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