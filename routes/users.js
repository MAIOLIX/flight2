'use strict';
var express = require('express');
var router = express.Router();
var airports = require('../routines/airports');
var fizzy = require('../routines/fizzyClient');
/* GET users listing. */
router.get('/', function(req, res) {
    var codes = req.app.get("airportCodes");
    var names = req.app.get("airportNames");
    var Iata = airports.searchAirports('fiumicino', codes, names);
    fizzy.quote2("AZA332", "2018-12-06T00:00:00.000Z", "1", "EUR", "IT");
    console.log(Iata);
    res.send('respond with a resource');
});

module.exports = router;