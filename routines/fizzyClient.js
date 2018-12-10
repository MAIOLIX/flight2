var Request = require('request');
var https = require('https');
var queryString = require('querystring');
var Client = require('node-rest-client').Client;
var client = new Client();
var unirest = require('unirest');
var axios = require('axios');
const fs = require('fs');
//[{"passengerCount":1,"departureDate":"2018-12-06T00:00:00.000Z","currencyCode":"EUR","countryCode":"IT","flightNumber":"AZA332"}]

function quote3(flightNumber, departureDate, passengerCount, currencyCode, countryCode) {

    var options = {
        "method": "POST",
        "hostname": "fizzy-api.prod.fizzy.axa",
        "port": null,
        "path": "/api/1.0.0/quotes?locale=it",
        "headers": {
            "origin": "https://fizzy.axa",
            "x-requested-with": "XMLHttpRequest",
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36",
            "content-type": "application/json",
            "accept": "*/*",
            "referer": "https://fizzy.axa/it/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "postman-token": "d2b1f3aa-f218-c726-fa1f-ea7b00699172"
        }
    };

    var req = https.request(options, function(res) {
        var chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function() {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.write(JSON.stringify([{
        passengerCount: passengerCount,
        departureDate: departureDate,
        currencyCode: currencyCode,
        countryCode: countryCode,
        flightNumber: flightNumber
    }]));
    req.end();
}

function testurl(myUrl) {
    axios.get(myUrl)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}
function quoteMock(callback) {
    var result;
    fs.readFile('./datas/resultFizzy.json', (err, data) => {
        if (err) throw err;
        var airportObj = JSON.parse(data);
        result = airportObj;
        airportObj.forEach(item => {
        });
        result = callback(result);
        return result;
    });

    return result;


}

function quoteFizzy(flightNumber, departureDate, passengerCount, currencyCode, countryCode, isMock) {
    var result;
    if (isMock == true)
        result = quoteMock((val) => {
            console.log(val);

        });
    else
        result = quote3(flightNumber, departureDate, passengerCount, currencyCode, countryCode);
    //console.log(result);
}

//quoteFizzy("AZA332", "2018-12-06T00:00:00.000Z", "1", "EUR", "IT",true);
//exports.quote = quote;
//exports.quote2 = quote2;
//quote2("AZA332", "2018-12-06T00:00:00.000Z", "1", "EUR", "IT", false);
//quote3();
//testurl("https://www.google.it");
//parseFizzyOutput();
//test2();