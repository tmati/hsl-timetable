function openID(id) {
    document.getElementById(id).style.display = "block";
}

function closeID(id) {
    document.getElementById(id).style.display = "none";
}

// Displays the login
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

// Used to log in as an existing user. Gives out page alerts if user with given name can't be found.
function userlogin() {
    const givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
    } else {
        getUser(givenName);
    }
}

// Used to log out as an existing user.
function logout() {
    sessionStorage.clear();
    showFavTable();
    document.getElementById('user').innerHTML = "";
    closeID("logoutForm");
    openID("loginInfo");
}

/**
 *
 */
function searchSchedule() {
    const stop = document.getElementById('searchField').value;
    if (cleanAndSaveName(stop)) {
        const url = window.location.href;
        const request = url.substring(0, url.indexOf("#")) + "#timetable";
        window.location.href = request;
    } else {
        alert("Epäkelpo syöte. yritä uudelleen.");
        location.reload();
    }
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
        sessionStorage.setItem('textStopName', textStopName);
        sessionStorage.setItem('stopNumber', stopNumber)
        if (sessionStorage.getItem('textStopName') == '') {
            return false;
        }
        return true;

    }
}

function requestSchedule(i) {
    var storage = sessionStorage.getItem('favorites');
    var favorites = JSON.parse(storage);
    sessionStorage.setItem('stopNumber', favorites[i].stopID);
    sessionStorage.setItem('textStopName', favorites[i].stopName);
    const url = window.location.href;
    const request = url.substring(0, url.indexOf("#")) + "#timetable";
    window.location.href = request;
}

function deleteFavorite($i) {
    const favorites = sessionStorage.getItem('favorites');
    const stop = JSON.parse(favorites);
    deleteFavoriteStop(stop[$i].stopID);
}

/**
 * Displays a user's favourite stops in a table.
 */
function showFavTable() {
    const favorites = sessionStorage.getItem('favorites');
    const favoritesTableBody = document.getElementById('favoritesTableBody');
    const tbody = document.createElement('tbody');
    tbody.setAttribute("id", "favoritesTableBody");
    if (favorites != null) {
        // Select pysäkki from favourites where userID = document.getElementById('login').value;
        const resultSet = JSON.parse(favorites);
        for (let i = 0; i < resultSet.length; i++) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const td2 = document.createElement('td');
            td2.setAttribute("class", "deleteFav")
            const icon = document.createElement('i');
            icon.setAttribute("class", "fas fa-minus")
            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute("onclick", "deleteFavorite(" + i +")");
            deleteBtn.appendChild(icon);
            td2.appendChild(deleteBtn);
            td.innerHTML = resultSet[i].stopName;
            td.setAttribute("onclick", "requestSchedule(" + i + ")");
            tr.appendChild(td);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
    } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.innerHTML = "Et ole kirjautuneena sisään. Kirjaudu sisään tai luo käyttäjä käyttääksesi suosikkipysäkit - toimintoa.";
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    favoritesTableBody.parentNode.replaceChild(tbody, favoritesTableBody);
}
