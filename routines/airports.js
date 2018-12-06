const fs = require('fs');

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
            var keyApp = item.city + '-' + item.countryCode;
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


function searchAirports(nome, airportCodes, airportNames) {
    nome = nome.toString().toLowerCase();
    var matches = airportNames.filter(s => s.includes(nome));
    var indexCode = airportNames.indexOf(matches.toString());
    appo = airportCodes[indexCode];
    return appo;
}


//https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=en&dt=t&q=Londra


exports.loadAirports = loadAirports;
exports.searchAirports = searchAirports;
exports.loadMapForCity = loadMapForCity;
//module.exports = loadAirports, searchAirports;