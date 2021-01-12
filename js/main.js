jQuery(function($) {
    var windowHeight = $(window).height();
    var navHeight = $("#nav_main").height();
    var homeHeight = windowHeight-navHeight;
    $('#home').css('height',homeHeight);
    $('body').css('padding-top',navHeight)
    $('body').css('scroll-padding-top',navHeight)
    $('html').css('scroll-padding-top',navHeight)
});