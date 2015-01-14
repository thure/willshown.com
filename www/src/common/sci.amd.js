define(['q', 'scion', 'GA', 'text!amd/portfolio.scxml'], function(q, scion, GA, portfolioSCXML){

  var int = null,
      d = q.defer();

  scion.documentStringToModel(portfolioSCXML,function(err, model){
    if(err){
      d.reject(err);
      GA.event('error', 'occurred', 'errors', window.pageErrors++, {
        'exDescription': 'SCION: ' + err.toString(),
        'exFatal': false
      });
    }else{

      var interpreter = new scion.SCXML(model);
      interpreter.start();

      int = interpreter;

      d.resolve(int);

    }
  });

  function PortfolioStateChart(){

    this.gen = function(){
      if(int){
        int.gen.apply(int, arguments);
      }
    };

    this.ready = d.promise;

  }

  return new PortfolioStateChart();

});