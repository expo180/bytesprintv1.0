$(document).ready(function() {
    $('.logo-carousel').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        dots: false,
        pauseOnHover: false,
        responsive: [{
        breakpoint: 768,
        settings: {
            slidesToShow: 4
        }
        }, {
        breakpoint: 520,
        settings: {
            slidesToShow: 2
        }
        }]
    });
    });