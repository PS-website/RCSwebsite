;(function () {

    'use strict';

    var carousels = function() {
        $(".owl-carousel1").owlCarousel(
            {
                loop: true,
                margin: 10,
                center: true,
                autoplay: true,
                autoplayHoverPause: true,
                items: 3,
                autoplayTimeout: 4000,
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
            }
        );

        $(".owl-carousel2").owlCarousel(
            {
                loop:true,
                center: false,
                margin:0,
                responsiveClass:true,
                nav:true,
                responsive:{
                    0:{
                        items:1,
                        nav:false
                    },
                    600:{
                        items:2,
                        nav:false
                    },
                    1000:{
                        items:3,
                        nav:true,
                        loop:true
                    }
                }
            }
        );
    }

    var checkPosition = function() {
        // svg responsive in mobile mode
        if ($(window).width() < 767) {
            $("#bg-services").attr("viewBox", "0 0 1050 800");

        }
        // RSC Logo responsive in mobile mode
        if ($(window).width() <= 600) {
            $(".rashiv-logo").attr("src", "images/rashiv_logo-white.png");
            $(".rashiv-nav-logo").css("display", "none");

        }
    };

    (function($) {
        carousels();
        checkPosition();
    })(jQuery);


}());

// menu toggle button
function myFunction(x) {
    x.classList.toggle("change");
    if ($("#my-nav").css("position") == "fixed") {
        // using .attr since .css doesn't understand !important in jquery
        $("#my-nav").attr('style', 'position: inherit;background-color: transparent !important;');
    }
    else {
        $("#my-nav").css("position", "fixed");
    }
}

//change nav color on scroll
$(function () {
    $(document).scroll(function () {
        var $nav = $("#my-nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        var $navlogo = $(".rashiv-nav-logo");
        if ( $nav.hasClass('scrolled') ) {
            $navlogo.attr('src', 'images/rashiv_logo-white.png');
        }
        else {
            $navlogo.attr('src', 'images/rashiv_logo-blue.png');
        }
    });
});

// courses list page
function courseHover(courseId) {
    document.getElementById(courseId).innerHTML = "View the course details";
}

// course select dropdown on contact us page
var expanded = false;
function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

// password validators
document.addEventListener('DOMContentLoaded', function () {
    // Password should match confirm password
    var myInput1 = document.getElementById('password');
    var myInput2 = document.getElementById('confirm_password');
    if (myInput2 == null) {
        return;
    }
    myInput2.onkeyup = function () {
        if (myInput1.value != myInput2.value) {
            // this adds the error class
            myInput2.style.border = '2px solid red';
            document.getElementById('submit').disabled = true;
        } else {
            // this removes the error class
            myInput2.style.border = '';
            document.getElementById('submit').disabled = false;
        }
    };

    // Don't give user a hard time to figure out what is wrong
    var letter = document.getElementById('letter');
    var capital = document.getElementById('capital');
    var number = document.getElementById('number');
    var length = document.getElementById('length');

    // When the user starts to type something inside the password field
    myInput1.onkeyup = function () {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput1.value.match(lowerCaseLetters)) {
            letter.classList.remove('invalid');
            letter.classList.add('valid');
        } else {
            letter.classList.remove('valid');
            letter.classList.add('invalid');
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput1.value.match(upperCaseLetters)) {
            capital.classList.remove('invalid');
            capital.classList.add('valid');
        } else {
            capital.classList.remove('valid');
            capital.classList.add('invalid');
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput1.value.match(numbers)) {
            number.classList.remove('invalid');
            number.classList.add('valid');
        } else {
            number.classList.remove('valid');
            number.classList.add('invalid');
        }

        // Validate length
        if (myInput1.value.length >= 8) {
            length.classList.remove('invalid');
            length.classList.add('valid');
        } else {
            length.classList.remove('valid');
            length.classList.add('invalid');
        }
    };
});
// password toggle visibility
function toggleVisibility(idname) {
    var $inputBox = $(`#${idname}`);
    var $eye = $inputBox.siblings("span").children("i");
    var type = $inputBox.attr("type");
    if (type === "text") {
        $inputBox.attr("type", "password");
        $eye.addClass("fa-eye-slash");
        $eye.removeClass("fa-eye");
    } else {
        $inputBox.attr("type", "text");
        $eye.addClass("fa-eye");
        $eye.removeClass("fa-eye-slash");
    }
}

// CreateWhatsappChatWidget
var url = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?21071';
var s = document.createElement('script');
s.type = 'text/javascript';
s.async = true;
s.src = url;
var options = {
"enabled":true,
"chatButtonSetting":{
    "backgroundColor":"#22e218",
    "ctaText":"",
    "borderRadius":"70",
    "border":"10px",
    "marginLeft":"0",
    "marginBottom":"25",
    "marginRight":"25",
    "position":"right"
},
"brandSetting":{
    "brandName":"Rashiv Cloud Solution",
    "brandSubTitle":"Typically replies within a day",
    "brandImg":"images/rcs_logo_whatsapp.jpeg",
    "welcomeText":"Hi there!\nHow can I help you?",
    "messageText":"Hello, I have a question about ",
    "backgroundColor":"#078df2",
    "ctaText":"Start Chat",
    "borderRadius":"25",
    "autoShow":false,
    "phoneNumber":"919900176030"
}
};
s.onload = function() {
    CreateWhatsappChatWidget(options);
};
var x = document.getElementsByTagName('script')[0];
x.parentNode.insertBefore(s, x);


var closebtns = document.getElementsByClassName("close");
var i;

/* Loop through the elements, and hide the parent, when clicked on */
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
    this.parentNode.style.display = 'none';
  });
}