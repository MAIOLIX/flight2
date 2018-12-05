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

function searchAirports(nome, airportCodes, airportNames) {
    nome = nome.toString().toLowerCase();
    let matches = airportNames.filter(s => s.includes(nome));
    let indexCode = airportNames.indexOf(matches.toString());
    appo = airportCodes[indexCode];
    return appo;
}


//https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=en&dt=t&q=Londra

exports.loadAirports = loadAirports;
exports.searchAirports = searchAirports;
//module.exports = loadAirports, searchAirports;