'use strict';

// https://medium.com/frontend-fun/js-vanilla-script-spa-1b29b43ea475

/**
 * Router class which handling routing.
 * @param routes
 * @constructor
 */
function Router(routes) {
    try {
        if (!routes) {
            throw 'ERROR: routes needed'
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElement: undefined,
    constructor: function(routes) {
        this.routes = routes;
        this.rootElement = document.getElementById('app');
    },
    init: function () {
        const routes = this.routes;
        (function(scope, routes) {
            window.addEventListener('hashchange', function(e) {
                scope.hasChanged(scope, routes);
            });
        })(this, routes);
        this.hasChanged(this, routes);
    },
    hasChanged: function(scope, r) {
        if (window.location.hash.length > 0) {
            for (let i = 0; i < r.length; i++) {
                let route = r[i];
                if (route.isActive(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (let i = 0; i < r.length; i++) {
                let route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) {
            let url = 'views/' + htmlName;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElement.innerHTML = this.responseText;
                    console.log(htmlName);
                    if (htmlName === "timetable.html") {
                        onLoad();
                    } else if (htmlName === "search.html" && sessionStorage.getItem('userdata') != null) {
                        closeID("loginInfo");
                        const storage = sessionStorage.getItem('userdata');
                        const user = JSON.parse(storage);
                        document.getElementById('user').innerHTML = user.userName;
                        openID("logoutForm");
                        getFavorites(user.userID);
                    } else if (htmlName === "search.html"){
                        showFavTable();
                    } else {

                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
}
