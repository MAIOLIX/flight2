'use strict';
var express = require('express');
var router = express.Router();
var airports = require('../routines/airports');
/* GET users listing. */
router.get('/', function (req, res) {
    var codes = req.app.get("airportCodes");
    var names = req.app.get("airportNames");
    var Iata = airports.searchAirports('fiumicino', codes, names);
    console.log(Iata);
    res.send('respond with a resource');
});

module.exports = router;
