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
        alert(givenName);
        const foundName = get();
        //var foundName = Select from USER values WHERE Name = ('givenName');
        if (foundName != null) {
            document.getElementById('login').innerHTML =foundName;
            var logoutParagraph = document.createElement('a');
            logoutParagraph.id = "logoutBtn"
            logoutParagraph.innerHTML = 'Logout'
            logoutParagraph.onclick = function () {
                document.getElementById('login').innerHTML = "LUO KÄYTTÄJÄ | KIRJAUDU";
                deleteElement('logoutBtn');
            }
        } else {
            alert("Name not found in database. Try again.");
        }
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