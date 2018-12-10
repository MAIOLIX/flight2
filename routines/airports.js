const fs = require('fs');
const util = require('util');
function loadAirports(airportCodes, airportNames) {
    fs.readFile('./datas/airports.json', (err, data) => {
        if (err) throw err;
        let airportObj = JSON.parse(data);
        airportObj.airports.forEach(item => {
            airportCodes.push(item.fs);
            airportNames.push(item.name.toString().toLowerCase());

        });
    })
}

function loadMapForCity(airportMap) {
    //var app = {};
    //airportMap = app;
    fs.readFile('./datas/airports.json', (err, data) => {
        if (err) throw err;
        var airportObj = JSON.parse(data);
        airportObj.airports.forEach(item => {
            //var keyApp = item.city + '-' + item.countryCode;
            var keyApp = item.city;
            var airportsForCity = airportMap[keyApp];
            //var countryCode = item.countryCode;
            if (item.iata != undefined) {
                var appObj = {};
                appObj['descrizione'] = item.name;
                appObj['iata'] = item.iata;
                if (airportsForCity == null) {

                    airportsForCity = [];
                    airportsForCity.push(appObj);
                    airportMap[keyApp] = airportsForCity;


                } else {
                    //console.log('aggiungo');
                    airportsForCity.push(appObj);
                }
            }

        });
    })
}

function loadAirportSet(callback) {
    fs.readFile('../datas/airports.json', (err, data) => {
        if (err) throw err;
        let airportObj = JSON.parse(data);
        let arrAir = Object.values(airportObj);
        if (callback && typeof callback === "function") {
                callback(arrAir);
        }
    });
}
function somma(a, b, callback) {
    var risultato = (a + b);
    if (callback && typeof callback === "function") {
        risultato = callback(risultato);
    }
    return risultato;
}

function filterAirport(arr) {
    var matches = air.filter(s => s.city.includes('Rome'));
    console.log(matches);//console.log(app);
}




function searchAirports(nome, airportCodes, airportNames) {
    nome = nome.toString().toLowerCase();
    var matches = airportNames.filter(s => s.includes(nome));
    var indexCode = airportNames.indexOf(matches.toString());
    appo = airportCodes[indexCode];
    return appo;
}


//https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=en&dt=t&q=Londra


loadAirportSet(function (val) {
    var appo = val[0];
    var matches = appo.filter(s => s.city == 'Rome' && s.iata != undefined && s.classification<4);//trova tutti quelli con Rome
    var mappaCitta = matches.map((val, i, arr) => {
        return {
            nazione: val.countryName,
            citta: val.city,
            nome: val.name,
            iata: val.iata
        };
    });
    //mappaCitta.sort();
    console.log(mappaCitta);
});
//filterAirport();
exports.loadAirports = loadAirports;
exports.searchAirports = searchAirports;
exports.loadMapForCity = loadMapForCity;
//module.exports = loadAirports, searchAirports;