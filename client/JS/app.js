'use strict';

/**
 * Initialization function which start application.
 * https://medium.com/frontend-fun/js-vanilla-script-spa-1b29b43ea475
 */
(function () {
    function init() {
        const router = new Router([
            new Route('search', 'search.html', true),
            new Route('timetable', 'timetable.html', false)
        ]);
    }
    init();
}())
