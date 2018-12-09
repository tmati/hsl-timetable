'use strict'

/**
 * REST API request (GET) for getting the user from database.
 * @param name queries by name.
 */
function getUser(name) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(xhttp.responseText);
                const foundName = data.userName;
                closeID("loginInfo");
                closeID("loginForm");
                document.getElementById('user').innerHTML = foundName;
                openID("logoutForm");
                sessionStorage.setItem('userdata', xhttp.responseText);
                getFavorites(data.userID);
            } else if (this.readyState == 4 ) {
                showError("loginInfo", "User not found in database!");
            }
        }
        const request = "http://localhost/server/index.php/rtmapi/users/" + name;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

/**
 * REST API request (GET) for getting the favorite stops from database.
 * @param id querying by userID
 */
function getFavorites(id) {
    if (id != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(xhttp.responseText);
                const favorites = data.favorites;
                sessionStorage.setItem('favorites', JSON.stringify(favorites));
                showFavTable();
            }
        }
        const request = "http://localhost/server/index.php/rtmapi/stops/" + id;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

/**
 * REST API request (POST) for adding the user to database.
 * @param name The new username
 */

function postUser(name) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(name);
                console.log("Käyttäjä lisätty.");
            }
        }
        const data = '{ "name" : "' + name + '" }';
        const request = "http://localhost/server/index.php/rtmapi/user";
        xhttp.open("POST", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}

/**
 * REST API request (POST) for adding the favorite stop to database.
 * @param stopid The StopID to add
 * @param userid The UserID to add
 * @param stopname The stop plaintext name to add
 */
function postFavoriteStop(userid, stopid, stopname) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Suosikki lisätty");
                console.log(data);
            }
        }
        const data = '{ "userID" : "' + userid + '", "stopID" : "' + stopid + '", "stopName" : "' + stopname + '" }';

        const request = "http://localhost/server/index.php/rtmapi/favoritestop";
        xhttp.open("POST", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}

/**
 * REST API request (DELETE) for removing the favorite stop from database.
 * @param id the id of favorite stop
 */
function deleteFavoriteStop(id) {
    if (id != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Pysäkki ".id);
                const userdata = sessionStorage.getItem('userdata');
                const user = JSON.parse(userdata);
                getFavorites(user.userID);
            }
        }

        const request = "http://localhost/server/index.php/rtmapi/favorite/" + id;
        xhttp.open("DELETE", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
}