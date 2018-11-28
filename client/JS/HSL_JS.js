//Deletes the element given as parameter.
function deleteElement(elementID) {
    var toDelete = document.getElementById(elementID);
    toDelete.parentNode.removeChild(toDelete);
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
            document.getElementById('login').innerHTML = "Hei! " + foundName + "on kirjautuneena sisään!"
            var logoutParagraph = document.createElement('a');
            logoutParagraph.id = "logoutBtn"
            logoutParagraph.innerHTML = 'Logout'
            logoutParagraph.onclick = function () {
                document.getElementById('login').innerHTML = "LUO TUNNUS / KIRJAUDU";
                deleteElement('logoutBtn');
            }
        } else {
            alert("Name not found in database. Try again.");
        }
    }
}

//Querying HSL API for transit stop information.
function getDataForStop(stopName) {
    console.log(stopName);
    if (stopName != null) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var json = JSON.parse(xhttp.responseText);
                console.log(json.data.stops);
                var jsonArr = json.data.stops;
                var namesArray = [];
                for (let i = 0; i < jsonArr.length; i++) {
                    var tempString = jsonArr[i].name + " / " + jsonArr[i].code;
                    namesArray.push(tempString);

                }
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