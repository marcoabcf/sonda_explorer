var mapMoviments = []
var mapDirections = []
var starDirections = []

var loadMaps = function() {
    mapDirections['R'] = 90;
    mapDirections['L'] = -90;

    mapMoviments['EM'] = '1,0';
    mapMoviments['NM'] = '0,1';
    mapMoviments['SM'] = '0,-1';
    mapMoviments['WM'] = '-1,0';

    starDirections['N'] = 0;
    starDirections['E'] = 90;
    starDirections['S'] = 180;
    starDirections['W'] = 270;
}

var getValueDirection = function(sonda, moviment) {
    var starDirection = starDirections[sonda.direction] + mapDirections[moviment]

    if(starDirection == 360) {
        starDirection = 0
    }

    if(starDirection < 0) {
        starDirection = 270
    }

    if(starDirection > 360) {
        starDirection = 90
    }

    return starDirection
}

var startMoviment = (sonda) => {
    sonda.moviments_sonda.split('').map(function(moviment) {
        if((moviment == 'R' || moviment == 'L') && mapDirections[moviment]) {
            var starDirection = getValueDirection(sonda, moviment)
            sonda.direction = Object.keys(starDirections).filter((k) => {
                return starDirections[k] == starDirection
            }).shift()
        }

        var coordMoviment = mapMoviments[sonda.direction + moviment]
        if(moviment == 'M' && coordMoviment) {
            coordMoviment = coordMoviment.split(',')
            sonda.x += parseInt(coordMoviment[0])
            sonda.y += parseInt(coordMoviment[1])
        }
    })
    console.log(sonda)
}

module.exports = {
    loadMaps : loadMaps,
    startMoviment : startMoviment,
};
