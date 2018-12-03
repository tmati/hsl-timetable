function openID(id) {
    document.getElementById(id).style.display = "block";
}

function closeID(id) {
    document.getElementById(id).style.display = "none";
}

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

/**
 * Displays the login form
 */
function displayLogin() {
    openID("loginForm");
}

/**
 * Creates a named user and tries to add it to the database.
 */
function createUser() {
    const givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
        document.getElementById('dropDownMenu').style.display = 'none';
    } else {
        alert(givenName);
        postUser(givenName);
    }
    document.getElementById('loginInfo').style.display = 'none';
}

/**
 * Used to log in as an existing user.
 */
function userlogin() {
    const givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
    } else {
        getUser(givenName);
    }
}

/**
 * Logout
 */
function logout() {
    alert("TODO: logout");
}

/**
 *
 */
function searchSchedule() {
    const stop = document.getElementById('searchField').value;
    cleanAndSaveName(stop);
    const url = window.location.href;
    const request = url.substring(0, url.indexOf("#")) + "#timetable";
    window.location.href = request;
}

/**
 * Modifies search field input to match HSL API query requirements.
 * @param stopName the input from the search field.
 */
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

/**
 * Displays a user's favourite stops in a table.
 */
function showFavTable() {
    const favorites = sessionStorage.getItem('favorites');
    if (favorites != null) {
        // Select pysäkki from favourites where userID = document.getElementById('login').value;
        const favoritesTableBody = document.getElementById('favoritesTableBody');
        const resultSet = JSON.parse(favorites);
        const tbody = document.createElement('tbody');
        for (let i = 0; i < resultSet.length; i++) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = resultSet[i].stopName;
            //td.onclick = displayStopTimeTable(this.innerHTML);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        favoritesTableBody.parentNode.replaceChild(tbody, favoritesTableBody);
    }
    //#document.getElementById('favTable').style.display = 'block';
}
