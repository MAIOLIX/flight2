'use strict';
var express = require('express');
var userRouter = express.Router();
var airports = require('../routines/airports');
var fizzy = require('../routines/fizzyClient');
/* GET users listing. */

userRouter.get('/', function(req, res) {
    console.log(req.query.city);
    var codes = req.app.get("airportCodes");
    var names = req.app.get("airportNames");
    //var Iata = airports.searchAirports('fiumicino', codes, names);
    var airportMap = req.app.get('airportMap');

    var airportMap = req.app.get('airportMap');
    var airports = airportMap[req.query.city];
    res.status(200);
    res.send(airports);

    //console.log('chiamo mappa');
    //var appo = airportMap['Rome-US'];
    //console.log(appo);
    //res.send('respond with a resource');
});
//userRouter.get('/search?:city', function(req, res) {



//});




module.exports = userRouter;