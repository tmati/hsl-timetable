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