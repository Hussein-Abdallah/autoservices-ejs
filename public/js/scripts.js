$( document ).ready(function() {
    $('.carousel').carousel({
        interval: 10000
    })
    

    $(".carousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 5 ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -5 ){
            $(this).carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
    });

    $('.counter').counterUp({
        delay: 5,
        time: 3000,
    })
    
    $('#phoneNumber').mask('(999) 999-9999');
      
  
});

