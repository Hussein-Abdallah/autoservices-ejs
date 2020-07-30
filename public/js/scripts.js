$( document ).ready(function() {

    $('.nav-button').click(function(){
        $('.nav-button').toggleClass('change')
    })

    $('.menu-item').click(function(){
        let value = $(this).attr('data-filter');
        $(this).closest('ul').find('.nav-active').removeClass('nav-active');
        $(this).addClass('nav-active');
        $('html, body').animate({
            scrollTop: $('#'+value).offset().top
        }, 2000);
    })
    
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


    $(window).scroll(function(){
        let position =$(this).scrollTop();
        if(position >=100) {
            $('#topbar').hide();
            // $('#topbar').addClass('hide');
        } else {
            $('#topbar').show();
            // $('#topbar').removeClass('hide');
        }
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

  
});

