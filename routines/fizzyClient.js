var Request = require('request');
var https = require('https');
var queryString = require('querystring');
var Client = require('node-rest-client').Client;
var client = new Client();
var unirest = require('unirest');
var axios = require('axios');

//[{"passengerCount":1,"departureDate":"2018-12-06T00:00:00.000Z","currencyCode":"EUR","countryCode":"IT","flightNumber":"AZA332"}]
function quote2(flightNumber, departureDate, passengerCount, currencyCode, countryCode) {
    var data = JSON.stringify({
        "passengerCount": passengerCount,
        "departureDate": departureDate,
        "currencyCode": currencyCode,
        "countryCode": countryCode,
        "flightNumber": flightNumber 
    });

    var options = {
        host: 'fizzy-api.prod.fizzy.axa',
        port: '443',
        path: '/api/1.0.0/quotes?locale=it',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    var req = https.request(options, function (res) {
        var msg = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk[2]);
            msg += chunk;
        });
        res.on('end', function () {
            console.log('ciao');
            //console.log(JSON.parse(msg));
        });
    });

    req.write(data);
    req.end();


}





function quote(flightNumber, departureDate, passengerCount, currencyCode, countryCode) {
    var baseUrl = "https://fizzy-api.prod.fizzy.axa/api/1.0.0/quotes?locale=it";
    var body = JSON.stringify({
        "passengerCount": passengerCount,
        "departureDate": departureDate ,
        "currencyCode": currencyCode ,
        "countryCode":countryCode ,
        "flightNumber":flightNumber 
    });
    console.log(body);
    var ciccio = '';
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": baseUrl,
        "body": body
    }, (error, response, body2) => {
        if (error) {
            console.log('errore');
            return console.dir(error);
        }
        var appo = JSON.parse(body2);
        console.log(appo);

        console.log(ciccio);
        //console.log(body);
        //console.dir(JSON.parse(body));
    });
}

quote("AZA332", "2018-12-06T00:00:00.000Z", "1", "EUR", "IT");