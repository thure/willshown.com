define(['jquery', 'underscore', 'GA', 'amd/sci'], function($, _, GA, sci){

  function MainNav(){

    this.bind = function(){
      $('nav.main a').on('click', function($e){
        $e.preventDefault();
        var href = $e.target.getAttribute('href').replace(/^#/, '');
        if(href === 'portfolio' && document.body.getAttribute('data-displaying') === 'portfolio'){
          sci.gen('up');
        }
        document.body.setAttribute('data-displaying', href);
        GA.view({
          page: '/' + href
        });
      });
    };

  }

  return new MainNav();

});