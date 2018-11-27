var Request = require('request');
//[{"passengerCount":1,"departureDate":"2018-12-06T00:00:00.000Z","currencyCode":"EUR","countryCode":"IT","flightNumber":"AZA332"}]
function quote(flightNumber, departureDate, passengerCount, currencyCode, countryCode) {
    var baseUrl = "https://fizzy-api.prod.fizzy.axa/api/1.0.0/quotes?locale=it";
    var body = JSON.stringify({
        "passengerCount": '"' + passengerCount + '"',
        "departureDate": '"' + departureDate + '"',
        "currencyCode": '"' + currencyCode + '"',
        "countryCode": '"' + countryCode + '"',
        "flightNumber": '"' + flightNumber + '"'
    });
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": baseUrl,
        "body": body
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    });
}
quote("AZA332", "2018-12-06T00:00:00.000Z", "1", "EUR", "IT");