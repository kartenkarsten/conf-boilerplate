(function () {
    'use strict';

    var conf = {};

    // Init functions, called on DOMContentLoaded event
    conf.init = function () {
        conf.map.init($('#map'));
        conf.menu.init();
    };

    /***
        Map implementation
    ***/

    
    conf.map = {
        marker: 'themes/yellow-swan/img/marker-default.png'
    };

    conf.map.init = function ($element) {
        conf.map.element = $element;

        conf.map.latlon = [
            parseFloat(conf.map.element.attr('data-lat')), 
            parseFloat(conf.map.element.attr('data-lon')) 
            ];

        conf.map.canvas = L.map('map').setView(conf.map.latlon, 16);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(conf.map.canvas);
        L.marker(conf.map.latlon).addTo(conf.map.canvas);

    }

    /***
        Create animated scroll for menu links
    ***/
    conf.menu = {
        itemsSelector: '.nav-link[href^="#"]',
        animationSpeed: 400
    };

    conf.menu.init = function () {
        conf.menu.menuItems = $(conf.menu.itemsSelector);
        conf.menu.document = $('html, body');

        conf.menu.menuItems.on('click.animateScroll', function (event) {
            event.preventDefault();

            conf.menu.animateTo(event.target);
        });
    };

    conf.menu.animateTo = function (link) {

        var $link = $(link),
            href = $link.attr('href'),
            offSetTop = $(href).offset().top;
        
        conf.menu.document.finish().animate({scrollTop : offSetTop}, conf.menu.animationSpeed, function () {
            location.hash = href;
        });
    };

    conf.init();
}());
