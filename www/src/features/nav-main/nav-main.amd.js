define(['jquery', 'underscore', 'amd/sci'], function($, _, sci){

  function MainNav(){

    this.bind = function(){
      $('nav.main a').on('click', function($e){
        $e.preventDefault();
        var href = $e.target.getAttribute('href').replace(/^#/, '');
        if(href === 'portfolio' && document.body.getAttribute('data-displaying') === 'portfolio'){
          sci.then(function(i){
            i.gen('up');
          });
        }
        document.body.setAttribute('data-displaying', href);
      });
    };

  }

  return new MainNav();

});