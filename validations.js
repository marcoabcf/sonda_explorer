const UTIL = require('./util');

const FORMATS = {
    'COUNT_SONDAS' : /^\d+$/,
    'COORD_SUPERIOR_DIREITA' : /^([\d]\s{1}[\d])$/,
    'COORD_SONDA' : /^([\d]\s{1}[\d]\s{1}[N|E|S|W]{1})$/i,
    "MOVIMENTOS" : /[L|R|M]/i
}

var formatValue = function(str, format) {
    return str.match(format)
}

var coordInPlanalto = (coords_planalto, coords_sonda) => {
    coords_planalto = UTIL.getSplitCoords(coords_planalto);

    if (coords_sonda.x < 0 || coords_sonda.x > coords_planalto.x || coords_sonda.y < 0 || coords_sonda.y > coords_planalto.y) {
        throw '\nCoordenadas informadas para a sonda está fora do limite da malha do planalto ('+ coords_planalto.x +', '+ coords_planalto.y +').'
    }
}

module.exports = {
    FORMATS : FORMATS,
    formatValue : formatValue,
    coordInPlanalto: coordInPlanalto
}