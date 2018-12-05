var Request = require('request');
var https = require('https');
var queryString = require('querystring');
var Client = require('node-rest-client').Client;
var client = new Client();
var unirest = require('unirest');
var axios = require('axios');
const fs = require('fs');
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
        host: 'https://fizzy-api.prod.fizzy.axa/api/1.0.0/quotes?locale=it',
        proxy: 'http://maiola_st:Alessandro29@10.202.210.96:8080',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    var req = https.request(options, function(res) {
        var msg = '';

        res.setEncoding('utf8');
        console.log(res.data);
        res.on('data', function(chunk) {
            console.log(chunk[2]);
            msg += chunk;
        });
        res.on('end', function() {
            console.log('ciao');
            //console.log(JSON.parse(msg));
        });
    });

    req.write(data);
    req.end();


}

function quote3() {

    var options = {
        "method": "POST",
        "hostname": "fizzy-api.prod.fizzy.axa",
        "port": null,
        "proxy": 'http://maiola_st:Alessandro29@10.202.210.96:8080',
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
        passengerCount: 1,
        departureDate: '2018-12-06T00:00:00.000Z',
        currencyCode: 'EUR',
        countryCode: 'IT',
        flightNumber: 'AZA332'
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



function quote(flightNumber, departureDate, passengerCount, currencyCode, countryCode) {
    var baseUrl = "https://fizzy-api.prod.fizzy.axa/api/1.0.0/quotes?locale=it";
    var body = JSON.stringify({
        "passengerCount": passengerCount,
        "departureDate": departureDate,
        "currencyCode": currencyCode,
        "countryCode": countryCode,
        "flightNumber": flightNumber
    });
    console.log(body);
    var ciccio = '';
    Request.post({
        "headers": { "content-type": "application/json" },
        "proxy": 'http://maiola_st:Alessandro29@10.202.210.96:8080',
        "url": baseUrl,
        "body": body
    }, (error, response, body2) => {
        if (error) {
            console.log('errore');
        }
        //console.log(response.body.toString());
        var appo = JSON.parse(body2);
        console.log(appo);

        console.log(ciccio);
        //console.log(body);
        //console.dir(JSON.parse(body));
    });
}

function quoteMock(callback) {
    var result;
    fs.readFile('../datas/resultFizzy.json', (err, data) => {
        if (err) throw err;
        var airportObj = JSON.parse(data);
        result = airportObj;
        airportObj.forEach(item => {
            //console.log(item.primeAmount);
            //console.log(item.compensationAmount);
            //result = callback(result);
            //return result;
            //airportCodes.push(item.fs);
            //airportNames.push(item.name.toString().toLowerCase());

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
        result = quote3();
    //console.log(result);
}

function test2() {

    Request({
        url: 'https://fizzy-api.prod.fizzy.axa',
        proxy: 'http://maiola_st:Alessandro29@10.202.210.96:8080'
    }, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });

}
//exports.quote = quote;
//exports.quote2 = quote2;
//quote2("AZA332", "2018-12-06T00:00:00.000Z", "1", "EUR", "IT", false);
quote3();
//testurl("https://www.google.it");
//parseFizzyOutput();
//test2();