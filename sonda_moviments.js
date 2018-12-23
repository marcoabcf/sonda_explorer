var mapDirections = []
var starDirections = []

var loadMaps = () => {
    mapDirections['M'] = 1;
    mapDirections['R'] = 90;
    mapDirections['L'] = -90;

    starDirections['N'] = 0;
    starDirections['E'] = 90;
    starDirections['S'] = 180;
    starDirections['W'] = 270;
}

var startMoviment = function(sonda) {
    sonda.moviments_sonda.split('').map(function(moviment) {
        if(mapDirections[moviment]) {
            if((moviment == 'R' || moviment == 'L')) {
                var starDirection = starDirections[sonda.direction] + mapDirections[moviment]

                if(starDirection == 360) {
                    starDirection = 0;
                }

                if(starDirection < 0) {
                    starDirection = 270;
                }

                if(starDirection > 360) {
                    starDirection = 90;
                }

                sonda.direction = Object.keys(starDirections).filter((k) => {
                    return starDirections[k] == starDirection;
                }).shift()
            }

            if(moviment == 'M') {
    
            }
        }
    })
}

module.exports = {
    loadMaps : loadMaps,
    startMoviment : startMoviment,
};
