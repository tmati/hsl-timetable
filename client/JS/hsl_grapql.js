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

//Querying HSL API for transit stop information.
function getDataForStop() {
    //console.log(stopName);
    const stopName = document.getElementById('searchField').value
    if (stopName != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function ()  {
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
