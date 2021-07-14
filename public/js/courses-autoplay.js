// Ensure to import Jquery and Owl Coursel before this
$(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        margin: 10,
        center: true,
        autoplay: true,
        autoplayHoverPause: true,
        items: 3,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                dots: true
            },
            600:{
                items:2,
                dots: true
            },
            1000:{
                items:3,
                dots: true
            }
        }
    });
})
