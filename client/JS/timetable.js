/**
 * Hides the icon and adds the currently displayed stop into the users favorite list.
 */

function hideIconAddFav() {
    document.getElementById('iconDiv').style.display = 'none';
    postFavoriteStop(sessionStorage.getItem('userdata').userName,sessionStorage.getItem('stopNumber'), sessionStorage.getItem('textStopName'));
}

/**
 * Gets the corresponding image for the received transit mode.
 * @param mode The transit type from the request.
 * @returns {string} The relative address of the correct image.
 */
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

/**
 * Gets the stops timetable and starts updating it once every minute.
 */
function onLoad() {
    getStopTimeTable();
    setInterval(getStopTimeTable, 60000);
}

/**
 * The function that gets all the data for the timetable.
 */
function getStopTimeTable() {
    console.log("running");
    console.log(sessionStorage.getItem('stopNumber'));
    console.log(sessionStorage.getItem('textStopName'));

    const dateString = getDate();
    document.getElementById('dateDiv').innerText = dateString;
    document.getElementById('stopDiv').innerHTML = sessionStorage.getItem('textStopName');
    document.getElementById('timeDiv').innerText = gettime();

    getDataForTimetable();
}

/**
 * Deletes the element given as parameter
 * @param elementID the element to delete
 */
function deleteElement(elementID) {
    var toDelete = document.getElementById(elementID);
    toDelete.parentNode.removeChild(toDelete);
}

/**
 * Gets the current time as seconds since midnight.
 * @returns {number} Seconds elapsed today.
 */
function getSecSinceMidnight() {
    var midnight = new Date(), now = new Date();
    var SecSinceMidnight = (now - midnight.setHours(0,0,0,0))/1000;
    return SecSinceMidnight;
}

/**
 * Adds a zero in front of the getMinutes function if it returns less than 10
 * @param minutes the value to check
 * @returns {*} time in hours:minutes
 */
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

/**
 * Gets today's date.
 * @returns {string}
 */
function getDate() {
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth()+1; //January is 0!

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    var dateNow = dd + '.' + mm + '.' + d.getFullYear();
    return dateNow;
}

/**
 * Gets hours and minutes.
 * @returns {string}
 */
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
