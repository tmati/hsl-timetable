
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