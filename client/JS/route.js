'use strict'

// https://medium.com/frontend-fun/js-vanilla-script-spa-1b29b43ea475

/**
 * Route class
 * @param name
 * @param htmlName
 * @param defaultRoute
 * @constructor
 */
function Route(name, htmlName, defaultRoute) {
    try {
        if (!name || !htmlName) {
            throw 'ERROR: name and htmlName needed'
        }
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function (name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActive: function (hashedPath) {
      return hashedPath.replace('#', '') === this.name;
    }
}