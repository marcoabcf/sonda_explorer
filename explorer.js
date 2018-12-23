const UTIL = require('./util');
const READLINE = require('readline');
const MESSAGES = require('./messages');
const VALIDATE = require('./validations');
const SONDA_MOVIMENTS = require('./sonda_moviments');

var sondas = [];
const readlineInterface = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (msg, format) => {
    return new Promise((resolve, reject) => {
        readlineInterface.question(MESSAGES.DEFAULT.replace('message', msg), (answer) => {
            if(VALIDATE.formatValue(answer, format)) {
                resolve(answer)
            } else {
                reject('Formato Inválido')
            }
        })
    })
}

const main = async () => {
    try {
        SONDA_MOVIMENTS.loadMaps();
        var number_sonda = await question(MESSAGES.MESSAGE_QUANTIDADE_SONDAS, VALIDATE.FORMATS.COUNT_SONDAS)
        var coords_planalto = await question(MESSAGES.MESSAGE_COORDENADA_SUPERIOR_DIREITA, VALIDATE.FORMATS.COORD_SUPERIOR_DIREITA)

        var count_sonda = 0;
        while (number_sonda > 0) {
            var coords_sonda = await question(MESSAGES.MESSAGE_COORDENADA_SONDA.replace('number_sonda', count_sonda+1), VALIDATE.FORMATS.COORD_SONDA)
            var sonda = UTIL.getSplitCoords(coords_sonda);

            VALIDATE.coordInPlanalto(coords_planalto, sonda);

            sonda.moviments_sonda = await question(MESSAGES.MESSAGE_MOVIMENTOS_SONDA.replace('number_sonda', count_sonda+1), VALIDATE.FORMATS.MOVIMENTOS)
            sondas[count_sonda] = SONDA_MOVIMENTS.startMoviment(sonda);

            ++count_sonda
            --number_sonda
        }

        readlineInterface.pause()
    } catch(error) {
        console.log(error);
        readlineInterface.close()
    }
}

main()