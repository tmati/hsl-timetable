function deleteElement(elementID) {
    var toDelete = document.getElementById(elementID);
    toDelete.parentNode.removeChild(toDelete);
}

function createUser() {
    var givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
        document.getElementById('dropDownMenu').style.display = 'none';
    } else {
        alert(givenName);
        //Insert into USER values ('givenName');
    }
    document.getElementById('dropDownMenu').style.display = 'none';
}

function userlogin() {
    var givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
    } else {
        alert(givenName);
        var foundName;
        //var foundName = Select from USER values WHERE Name = ('givenName');
        if (foundName != null) {
            document.getElementById('login').innerHTML = "Hei! " + foundName + "on kirjautuneena sisään!"
            var logoutParagraph = document.createElement('a');
            logoutParagraph.id = "logoutBtn"
            logoutParagraph.innerHTML = 'Logout'
            logoutParagraph.onclick = function () {
                document.getElementById('login').innerHTML = "LUO TUNNUS / KIRJAUDU";
                deleteElement('logoutBtn');
            }
        } else {
            alert("Name not found in database. Try again.");
        }
    }
}

function getDataForStop(stopName) {
    stopName = document.getElementById('searchField').value;
    if (stopName != null) {
        const request = require('request');
        var req = {
            url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: {
                "query": `{ 
    stops(name: stopName) { 
      name 
      gtfsid
      code 
    } 
  }`
            },
            json: true
        };
        request(req, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.stringify(body, null, 4));
            }
        });
    } else {
        alert("Stop name not defined!");
    }
}

    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    function displayLogin() {
        document.getElementById("dropDownMenu").classList.toggle("show");
    }