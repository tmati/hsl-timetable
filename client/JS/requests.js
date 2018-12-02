// GET user request to the REST API.
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
        const url = window.location.href;
        const request = url.substring(0, url.indexOf("client")) + "server/index.php?user=" + name;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

// GET favorites request to the REST API.
function getFavorites(id) {
    if (id != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
            const data = JSON.parse(xhttp.responseText);
            const favorites = data.favorites;
            sessionStorage.setItem('favorites', JSON.stringify(favorites));
            showFavTable();
        }
        const url = window.location.href;
        const request = url.substring(0, url.indexOf("client")) + "server/index.php?ID=" + id;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

// POST user request to the REST API.
function postUser(name) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
                console.log("Käyttäjä lisätty.");
        }
        const data = '{ "name" : "' + name + '" }';
        const url = window.location.href;
        const request = url.substring(0, url.indexOf("client")) + "server/index.php?";
        xhttp.open("POST", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}