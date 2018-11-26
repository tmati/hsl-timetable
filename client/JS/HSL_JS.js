function createUser() {
    var Name = document.getElementById('username').value;
    alert(Name);
    document.getElementById('dropDownMenu').style.display = 'none';
}


var stopName = document.getElementById('searchField').value;

function getDataForStop(stopName) {
    if (stopName != null) {
        const request = require('request');
        var req = {
            url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: {
                "query": `{ 
    stops(name: stopName) { 
      name 
      gtfsid
      code 
    } 
  }`
            },
            json: true
        };
        request(req, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.stringify(body, null, 4));
            }
        });
    }
}

    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    function displayLogin() {
        document.getElementById("dropDownMenu").classList.toggle("show");
    }

// Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.login')) {
            var dropdowns = document.getElementsByClassName("dropdownContent");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
