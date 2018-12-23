const VALIDATE = require('./validations')

var mapMoviments = []
var mapDirections = []
var starDirections = []

/**
 * Loads the mappings of the directions and motions of the probe and wind rose axis.
 */
var loadMaps = function() {
    mapDirections['R'] = 90
    mapDirections['L'] = -90

    mapMoviments['EM'] = '1,0'
    mapMoviments['NM'] = '0,1'
    mapMoviments['SM'] = '0,-1'
    mapMoviments['WM'] = '-1,0'

    starDirections['N'] = 0
    starDirections['E'] = 90
    starDirections['S'] = 180
    starDirections['W'] = 270
}

/**
 * Returns the value of the probe direction.
 * 
 * @param {object} sonda 
 * @param {String} moviment 
 */
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

/**
 * Performs the movement of the probe in the mesh of the upland.
 * 
 * @param {object} coords_planalto 
 * @param {object} sonda 
 */
var startMoviment = (coords_planalto, sonda) => {
    sonda.moviments_sonda.split('').map(function(moviment) {
        moviment = moviment.toUpperCase()
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
            
            VALIDATE.coordInPlanalto(coords_planalto, sonda)
        }
    })

    return sonda
}

/**
 * Functions exports.
 */
module.exports = {
    loadMaps : loadMaps,
    startMoviment : startMoviment,
}
