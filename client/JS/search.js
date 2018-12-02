function createLOGIN() {
    let loginElement = document.createElement("div");
    let loginButton = document.createElement('INPUT');
    loginButton.setAttribute("type", "button");
    loginButton.setAttribute("id", "loginBtn");
    loginButton.setAttribute("value", "Login");
    loginButton.addEventListener ("click", huhuu);
    loginElement.appendChild(loginButton);
    return loginElement;
};

function createLOGOUT(userName) {
    let logoutElement = document.createElement("div");
    logoutElement.setAttribute("id", "logoutForm");
    document.getElementById('login').innerHTML = userName;
    const logoutButton = document.createElement("INPUT");
    logoutButton.setAttribute("type", "button");
    logoutButton.setAttribute("id", "logoutBtn");
    logoutButton.setAttribute("value", "Logout");
    logoutButton.addEventListener ("click", logout);
    logoutElement.appendChild(logoutButton);
    return logoutElement;
}

// Displays the login
function displayLogin() {
    document.getElementById("loginForm").classList.toggle("show");
}

//Creates an user and tries to add it to the database. Gives out page alerts if problems arise.
function createUser() {
    const givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
        document.getElementById('dropDownMenu').style.display = 'none';
    } else {
        alert(givenName);
        postUser(givenName);
        //Insert into USER values ('givenName');
    }
    document.getElementById('login').style.display = 'none';
}

//Used to log in as an existing user. Gives out page alerts if user with given name can't be found.
function userlogin() {
    const givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
    } else {
        getUser(givenName);
    }
}

function logout() {
    alert("TODO: logout");
}

function searchSchedule() {
    const stop = document.getElementById('searchField').value;
    cleanAndSaveName(stop);
    const url = window.location.href;
    const request = url.substring(0, url.indexOf("#")) + "#timetable";
    window.location.href = request;
}

function cleanAndSaveName(stopName) {
    if (stopName != null) {
        var editString = stopName;
        editString.replace(/\s+/, "");
        stopName.replace(/\s+/, "");
        stopNumber = editString.substring(editString.indexOf("/") + 2);
        textStopName = stopName.substring(0, stopName.indexOf("/"));
        sessionStorage.setItem('stopNumber', stopNumber);
        sessionStorage.setItem('textStopName', textStopName);
    }
}

function showFavTable() {
    if (document.getElementById('login').innerHTML != "LUO KÄYTTÄJÄ | KIRJAUDU") {
        /*Select pysäkki from favourites where userID = document.getElementById('login').value;
        for (var i = 0; i < resultSet.length; i++) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            tr.id = "Row" + [i];
            td.id = "TD" + [i];
            td.innerHTML = resultSet[i];
            td.onclick = displayStopTimeTable(this.innerHTML);
            tr.appendChild(td);
            resultTable.appendChild(tr);        }
    */
    }
    document.getElementById('favTable').style.display = 'block';
}
