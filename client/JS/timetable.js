var timer = null;

function setModeIcon(mode) {
    //var img = document.createElement('img');
    let image = "#";
    switch (mode) {
        case "FERRY":
            image = "./content/img/Ferry.png";
            break;
        case "TRAM":
            image = "./content/img/Tram.png";
            break;
        case "RAIL":
            image = "./content/img/Train.png";
            break;
        case "SUBWAY":
            image = "content/img/Metro.png";
            break;
        case "BUS":
            image = "./content/img/Bus.png";
            break;
        default:
            image = "#";
    }
    return image;
}

function onLoad() {
    getStopTimeTable();
    timer = setInterval(getStopTimeTable, 60000);
}

function getStopTimeTable() {
    console.log("running");
    console.log(sessionStorage.getItem('stopNumber'));
    console.log(sessionStorage.getItem('textStopName'));

    const dateString = getDate();
    document.getElementById('dateDiv').innerText = dateString;
    document.getElementById('stopDiv').innerText = sessionStorage.getItem('textStopName');
    document.getElementById('timeDiv').innerText = gettime();

    getDataForTimetable();
}

function backLink() {
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    const url = window.location.href;
    const request = url.substring(0, url.indexOf("#")) + "#search";
    window.location.href = request;
}

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
