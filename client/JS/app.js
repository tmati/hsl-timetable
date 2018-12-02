'use strict';

(function () {
    function init() {
        const router = new Router([
            new Route('search', 'search.html', true),
            new Route('timetable', 'timetable.html', false)
        ]);
    }
    init();
}())