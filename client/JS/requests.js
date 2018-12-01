// GET user request to the REST API.
function getUser(name) {
    if (name != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
                const data = JSON.parse(xhttp.responseText);
                const foundName = data.userName;
                if (foundName != null) {
                    const logout = createLOGOUT(foundName);
                    document.getElementById('loginForm').parentNode.replaceChild(logout, document.getElementById('loginForm'));
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
function getFovorites(id, element) {
    if (id != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const data = JSON.parse(xhttp.responseText);
                const jsonArr = json.data.stops;

                var namesArray = [];
                for (let i = 0; i < jsonArr.length; i++) {

                    var tempString = jsonArr[i].name + " / " + jsonArr[i].code;
                    namesArray.push(tempString);
                }
                //console.log("namesArray: " + namesArray);
                autocomplete(document.getElementById("searchField"), namesArray);
            }
        }
        const url = window.location.href;
        const request = url.substring(0, url.indexOf("client")) + "server/index.php?ID=" + id;
        xhttp.open("GET", request, true);
        xhttp.send();
    }
}

// POST request to the REST API.
function makePostRequest(data) {
    if (data != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const data = JSON.parse(xhttp.responseText);
                var jsonArr = json.data.stops;

                var namesArray = [];
                for (let i = 0; i < jsonArr.length; i++) {

                    var tempString = jsonArr[i].name + " / " + jsonArr[i].code;
                    namesArray.push(tempString);
                }
                //console.log("namesArray: " + namesArray);
                autocomplete(document.getElementById("searchField"), namesArray);
            }

        }
        const url = window.location.href;
        const request = url.substring(0, url.indexOf("client")) + "server/index.php?" + parameters;
        xhttp.open("POST", request, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }
}