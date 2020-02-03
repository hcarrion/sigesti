'use strict';
function menu_ini() {
    var menu_timer;
    $('.menu-activated-on-hover').on('mouseenter', 'ul.main-menu>li.has-sub-menu', function () {
        var $elem = $(this);
        clearTimeout(menu_timer);
        $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
        $elem.addClass('active');
    });

    $('.menu-activated-on-hover').on('mouseleave', 'ul.main-menu > li.has-sub-menu', function () {
        var $elem = $(this);
        menu_timer = setTimeout(function () {
            $elem.removeClass('active').closest('ul').removeClass('has-active');
        }, 30);
    });
}
$(function () {
    $('.mobile-menu-trigger').on('click', function () {
        $('.menu-mobile .menu-and-user').slideToggle(200, 'swing');
        return false;
    });
});