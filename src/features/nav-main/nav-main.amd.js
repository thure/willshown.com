define(['jquery', 'underscore', 'amd/sci'], function($, _, sci){

  function MainNav(){

    (function(){

      $('nav.main a').on('click', function($e){
        $e.preventDefault();
        var href = $e.target.getAttribute('href').replace(/^#/, '');
        document.body.setAttribute('data-displaying', href);
        if(href === 'portfolio'){
          sci.then(function(i){
            i.gen('up');
          });
        }
      });

    }());

  }

  return new MainNav();

});