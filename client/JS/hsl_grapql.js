/**
 * Querying HSL API for stop name information. Is called every time the search field is updated.
 */
function getDataForStop() {
    //console.log(stopName);
    const stopName = document.getElementById('searchField').value
    if (stopName != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
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
function getDataForTimetable() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
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
                routeCell.innerHTML = "<h3>" + routeDesc + "</h3>"+ "<br />" + "<p>" + routeLongDesc + "</p>";

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