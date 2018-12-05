/**
 * Get user query for REST API
 * @param name queries by name.
 */
function getUser(name) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
                const data = JSON.parse(xhttp.responseText);
                const foundName = data.userName;
                if (foundName != null) {
                    closeID("loginInfo");
                    closeID("loginForm");
                    document.getElementById('user').innerHTML = foundName;
                    openID("logoutForm");
                    sessionStorage.setItem('userdata', xhttp.responseText);
                    getFavorites(data.userID);
                } else {
                    alert("Name not found in database. Try again.");
                }
        }
        const request = "http://localhost/server/index.php?user=" + name;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

/**
 * GET favorites request to the REST API.
 * @param id querying by userID
 */

function getFavorites(id) {
    if (id != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
            const data = JSON.parse(xhttp.responseText);
            const favorites = data.favorites;
            sessionStorage.setItem('favorites', JSON.stringify(favorites));
            showFavTable();
        }
        const request = "http://localhost/server/index.php?ID=" + id;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

/**
 * POST user request to the REST API.
 * @param name The name to send to the database.
 */

function postUser(name) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
                console.log(name);
                console.log("Käyttäjä lisätty.");
        }
        const data = '{ "name" : "' + name + '" }';
        const request = "http://localhost/server/index.php";
        xhttp.open("POST", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}

/**
 * POST favorite stop to REST API.
 * @param stopid The StopID to add
 * @param userid The UserID to add
 * @param stopname The stop plaintext name to add
 */
function postFavoriteStop(userid, stopid, stopname) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
            console.log("Suosikki lisätty");
            console.log(data);
        }
        const data = '{ "userID" : "' + userid + '", "stopID" : "' + stopid + '", "stopName" : "' + stopname + '" }';

        const request = "http://localhost/server/index.php";
        xhttp.open("POST", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}



function deleteFavoriteStop(id) {
    if (id != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
            console.log("Pysäkki ".id);
            const userdata = sessionStorage.getItem('userdata');
            const user = JSON.parse(userdata);
            getFavorites(user.userID);
        }

        const request = "http://localhost/server/index.php?sID=" + id;
        xhttp.open("DELETE", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    }
}