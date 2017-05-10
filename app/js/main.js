
$('#registration-form').validate({
    rules: {
        userPassword :{
            minlength: 6,
        }
    }
});
$('.slider').slick({
    dots: true,
    responsive: [
        {
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 3
            }
        }
    ]

});
