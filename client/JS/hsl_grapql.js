/**
 * Querying HSL API for stop name information. Is called every time the search field is updated.
 */
function getDataForStop() {
    //console.log(stopName);
    const stopName = document.getElementById('searchField').value
    if (stopName != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var json = JSON.parse(xhttp.responseText);
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

/**
 * Gets timetable data from HSL API and builds a DOM timetable view.
 */
function getDataForTimetable(requested) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var stopData = JSON.parse(xhttp.responseText);
            console.log(stopData.data.stops[0]);

            for (var i = 0; i < 10; i++) {

                const lineCell = document.getElementById('lineCell' + i);
                console.log(stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.shortName);
                const lineNbr = stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.shortName;
                lineCell.innerHTML = lineNbr;

                const imgCell = document.getElementById('typeImage' + i);
                var lineType = setModeIcon(stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode);
                imgCell.src = lineType;
                //lineCell.innerHTML = newImage;
                //imgCell.appendChild(lineType);

                const routeCell = document.getElementById('routeCell' + i);
                var routeDesc = stopData.data.stops[0].stoptimesWithoutPatterns[i].headsign;
                var routeLongDesc = stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.longName;
                if (routeDesc === null && stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode == "FERRY") {
                    routeCell.innerHTML = "<h3>" + "Boarding" + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                } else {
                    routeCell.innerHTML = "<h3>" + routeDesc + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                }

                if (routeDesc === null && stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode == "TRAM") {
                    routeCell.innerHTML = "<h3>" + "Linja vaihtuu" + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                } else {
                    routeCell.innerHTML = "<h3>" + routeDesc + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                }

                if (routeDesc === null && stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode == "BUS") {
                    routeCell.innerHTML = "<h3>" + "Linja vaihtuu" + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                } else {
                    routeCell.innerHTML = "<h3>" + routeDesc + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                }

                if (routeDesc === null && stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode == "RAIL") {
                    routeCell.innerHTML = "<h3>" + "Linja vaihtuu" + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                } else {
                    routeCell.innerHTML = "<h3>" + routeDesc + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                }

                if (routeDesc === null && stopData.data.stops[0].stoptimesWithoutPatterns[i].trip.route.mode == "SUBWAY") {
                    routeCell.innerHTML = "<h3>" + "Linja vaihtuu" + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                } else {
                    routeCell.innerHTML = "<h3>" + routeDesc + "</h3>" + "<br />" + "<p>" + routeLongDesc + "</p>";
                }

                const timeCell = document.getElementById('timeCell' + i);
                var routeArrival = addMinutesToTime(((stopData.data.stops[0].stoptimesWithoutPatterns[i].realtimeArrival - getSecSinceMidnight()) / 60) | 0);
                timeCell.innerHTML = routeArrival;

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

    var data = `{ stops(name: " ` + requested + `") {
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

/**
 * Checks stopName from HSL API. If the request returns data, stopName is ok.
 * @param stopName The parameter to check.
 */
function isStopNameValid(stopName, stopNumber) {
    console.log(stopName);
    console.log("haetaan " + stopNumber);
    console.log("checking params!");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            var jsonArr = json.data.stops;
            console.log(jsonArr[0].name);
            if (stopName.localeCompare(jsonArr[0].name) === 0) {
                console.log("Stop data is valid.");
                sessionStorage.setItem('stopNumber', stopNumber);
                sessionStorage.setItem('textStopName', stopName);
                const dateString = getDate();
                document.getElementById('dateDiv').innerText = dateString;
                document.getElementById('stopDiv').innerHTML = jsonArr[0].name;
                document.getElementById('timeDiv').innerText = gettime();
                getDataForTimetable(jsonArr[0].code);
            } else {
                alert("Pysäkkiä ei löydy HSL:n kannasta");
                backLink();
                return false;
            }
        }
    }
        var data = `{   stops(name:  " ` + stopNumber + `") {  
    name 
    code 
          }  
        }`
        xhttp.open("POST", "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", true);
        xhttp.setRequestHeader("Content-type", "application/graphql");
        xhttp.send(data);

}