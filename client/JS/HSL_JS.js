//Deletes the element given as parameter.
function deleteElement(elementID) {
    var toDelete = document.getElementById(elementID);
    toDelete.parentNode.removeChild(toDelete);
}

function getSecSinceMidnight() {
    var midnight = new Date(), now = new Date();
    var SecSinceMidnight = (now - midnight.setHours(0,0,0,0))/1000;
    return SecSinceMidnight;
}

function addMinutesToTime(minutes) {
    if (minutes >= 10) {
        var date1 = new Date();
        var date2 = new Date();
        date2.setMinutes(date1.getMinutes() + minutes);
        if (date2.getMinutes() < 10) {
            var completeString = "0" + date2.getMinutes();
        } else {
            completeString = date2.getMinutes();
        }
        var finalDate = date2.getHours() + ":" + completeString;
        return finalDate;
    }
    return minutes;
}

function setModeIcon(mode) {
    var img = document.createElement('img');
    switch (mode) {
        case "FERRY":
            img.src = "content/img/Ferry.png";
            break;
        case "TRAM":
            img.src = "content/img/Tram.png";
            break;
        case "RAIL":
            img.src = "content/img/Train.png";
            break;
        case "SUBWAY":
            img.src = "content/img/Metro.png";
            break;
        case "BUS":
            img.src = "content/img/Bus.png";
            break;
        default:
            img = mode;
    }
    return img;
}

function getDate() {
    var d = new Date();
    var dateNow = d.getDay() + "."  + d.getMonth() +"." +  d.getFullYear();
    return dateNow;
}

function gettime() {
    var d = new Date();
    if (d.getMinutes() < 10) {
        var finalString = "0" + d.getMinutes();

        var timeNow = d.getHours() + ":" + finalString;
        return timeNow;
    } else {
        var timeNow = d.getHours() + ":" + d.getMinutes();
        return timeNow;
    }


}

//Creates an user and tries to add it to the database. Gives out page alerts if problems arise.
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

//Used to log in as an existing user. Gives out page alerts if user with given name can't be found.
function userlogin() {
    var givenName = document.getElementById('username').value;
    if (givenName == "" || givenName.length == 0 || givenName == null) {
        alert("No name given. Try again");
    } else {
        alert(givenName);
        var foundName;
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

//Querying HSL API for transit stop information.
function getDataForStop(stopName) {
    //console.log(stopName);
    if (stopName != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var json = JSON.parse(xhttp.responseText);
                //console.log("JSON: " + json);
                //console.log(json.data.stops);
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
        var data = `{   stops(name:  " ` + stopName + `") { 
    gtfsId 
    name 
    code 
          }  
        }`
        xhttp.open("POST", "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", true);
        xhttp.setRequestHeader("Content-type", "application/graphql");
        xhttp.send(data);
    }
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

function deleteElements() {
   deleteElement('topInfoDiv');
    deleteElement('headerDiv');
    deleteElement('tableDiv');
    deleteElement('dateDiv');
    deleteElement('stopDiv');
    deleteElement('timeDiv');
}

function onLoad() {
    getStopTimeTable(sessionStorage.getItem('stopNumber'));
    setInterval(getStopTimeTable, 60000);
    setInterval(deleteElements, 59998);

}

function getStopTimeTable(cleanStopName) {
    console.log("running");
    console.log(sessionStorage.getItem('stopNumber'))
    var topInfoDiv = document.createElement('div');
    topInfoDiv.id = "topInfoDiv";
    topInfoDiv.className = 'topInfoDiv';
    document.getElementById('topDiv').appendChild(topInfoDiv);

    var dateDiv = document.createElement('div');
    dateDiv.id = "dateDiv";
    dateDiv.className = 'dateDiv';
    var dateString = getDate();
    dateDiv.innerText = dateString;
    document.getElementById('topDiv').appendChild(dateDiv);

    var StopDiv = document.createElement('div');
    StopDiv.id = "stopDiv";
    StopDiv.className = 'stopDiv';
    StopDiv.innerText = sessionStorage.getItem('textStopName');
    document.getElementById('topDiv').appendChild(StopDiv);

    var timeDiv = document.createElement('div');
    timeDiv.id = "timeDiv";
    timeDiv.className = 'timeDiv';
    timeDiv.innerText = gettime();
    document.getElementById('topDiv').appendChild(timeDiv);

    console.log(sessionStorage.getItem('textStopName'));

    var headerDiv = document.createElement('div');
    headerDiv.id = "headerDiv";
    headerDiv.className = 'headerDiv';
    document.getElementById('parentDiv').appendChild(headerDiv);

    var tableDiv = document.createElement('div');
    tableDiv.id = "tableDiv";
    tableDiv.className = 'tableDiv';
    document.getElementById('parentDiv').appendChild(tableDiv);

    var lineDiv = document.createElement('div');
    lineDiv.id = "headerDiv";
    lineDiv.innerText = "Linja";
    document.getElementById('headerDiv').appendChild(lineDiv);

    var routeDiv = document.createElement('div');
    routeDiv.id = "routeDiv";
    routeDiv.innerText = "Määränpää / reitti";
    document.getElementById('headerDiv').appendChild(routeDiv);

    var timeDiv = document.createElement('div');
    timeDiv.id = "timDiv";
    timeDiv.innerText = "Aika / Min";
    document.getElementById('headerDiv').appendChild(timeDiv);

    var timeTableDisplay = document.createElement('table');
    timeTableDisplay.id = "mainTable";
    document.getElementById('tableDiv').appendChild(timeTableDisplay);

    var tableBody = document.createElement('tbody');
    tableBody.id = "tableBody";
    document.getElementById('mainTable').appendChild(tableBody);

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var stopData = JSON.parse(xhttp.responseText);
            console.log(stopData.data.stops[0]);

            for (var i = 0; i < 10; i++) {

                var tableRow = document.createElement('tr');
                tableRow.id = "tableRow" + [i];
                document.getElementById('tableBody').appendChild(tableRow);
                //route number

                var lineCell = document.createElement('td');
                lineCell.id = 'lineCell' + [i];
                lineCell.className = "lineCell";
                console.log(stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.shortName);
                var lineNbr = stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.shortName;
                lineCell.innerHTML = lineNbr;
                document.getElementById('tableRow'+[i]).appendChild(lineCell);

                var imgCell = document.createElement('td');
                imgCell.id = 'imgCell' + [i];
                imgCell.className = "imgCell";
                var lineType = setModeIcon(stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode);
                document.getElementById('tableRow'+[i]).appendChild(imgCell);
                document.getElementById('imgCell'+[i]).appendChild(lineType);


                var routeCell = document.createElement('td');
                routeCell.id = 'routeCell' + [i];
                routeCell.className = "routeCell";
                var routeDesc = stopData.data.stops[0].stoptimesWithoutPatterns[i].headsign;
                var routeLongDesc = stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.longName;
                routeCell.innerHTML = "<h3>" + routeDesc + "</h3>"+ "<br />" + "<p>" + routeLongDesc + "</p>";
                document.getElementById('tableRow' + [i]).appendChild(routeCell);

                var timeCell = document.createElement('td');
                timeCell.id = 'timeCell' + [i];
                timeCell.className = "timeCell";
                timeCell.style.cssFloat = 'right';
                var routeArrival = addMinutesToTime(((stopData.data.stops[0].stoptimesWithoutPatterns[i].realtimeArrival - getSecSinceMidnight()) / 60) | 0);
                timeCell.innerHTML = routeArrival;
                document.getElementById('tableRow' + [i]).appendChild(timeCell);


                //route desc.
                console.log(stopData.data.stops[0].stoptimesWithoutPatterns[i].headsign);

                //route long desc.
                console.log(stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.longName);

                //route vehicle type
                console.log(stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode);

                //arrival time in minutes
                console.log("Arriving in " + (((stopData.data.stops[0].stoptimesWithoutPatterns[i].realtimeArrival - getSecSinceMidnight()) / 60) | 0) + " minutes");

            }
        }
    }
    var data = `{ stops(name: " ` + sessionStorage.getItem('stopNumber') + `") {
            stoptimesWithoutPatterns(numberOfDepartures:10) {
                realtimeArrival
                trip {
                    route {
                        shortName
                        longName
                        mode
                    }
                }
                headsign
            }
        }
    }`
    xhttp.open("POST", "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", true);
    xhttp.setRequestHeader("Content-type", "application/graphql");
    xhttp.send(data);
}


//Displays the login pop-up
function displayLogin() {
    document.getElementById("dropDownMenu").classList.toggle("show");
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
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