const UTIL = require('./util')
const READLINE = require('readline')
const MESSAGES = require('./messages')
const VALIDATE = require('./validations')
const SONDA_MOVIMENTS = require('./sonda_moviments')

const readlineInterface = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
})

/**
 * Show a question to enter data information.
 * 
 * @param {String} msg 
 * @param {Regex} format 
 */
const question = (msg, format) => {
    return new Promise((resolve, reject) => {
        readlineInterface.question(MESSAGES.DEFAULT.replace('message', msg), (answer) => {
            if(VALIDATE.formatValue(answer, format)) {
                resolve(answer)
            } else {
                reject('Formato Inválido.')
            }
        })
    })
}

/**
 * Main function of program execution.
 */
const main = async () => {
    try {
        SONDA_MOVIMENTS.loadMaps()
        
        var sondas = []
        var number_sonda = await question(MESSAGES.MESSAGE_QUANTIDADE_SONDAS, VALIDATE.FORMATS.COUNT_SONDAS)
        var coords_planalto = await question(MESSAGES.MESSAGE_COORDENADA_SUPERIOR_DIREITA, VALIDATE.FORMATS.COORD_SUPERIOR_DIREITA)

        var count_sonda = 0
        while (count_sonda < number_sonda) {
            var coords_sonda = await question(MESSAGES.MESSAGE_COORDENADA_SONDA.replace('number_sonda', count_sonda+1), VALIDATE.FORMATS.COORD_SONDA)
            var sonda = UTIL.getSplitCoords(coords_sonda)

            VALIDATE.coordInPlanalto(coords_planalto, sonda)

            sonda.moviments_sonda = await question(MESSAGES.MESSAGE_MOVIMENTOS_SONDA.replace('number_sonda', count_sonda+1), VALIDATE.FORMATS.MOVIMENTOS)
            sondas[count_sonda] = SONDA_MOVIMENTS.startMoviment(coords_planalto, sonda)

            ++count_sonda
        }

        sondas.forEach((sonda) => {
            console.log(sonda.x, sonda.y, sonda.direction)
        })

        readlineInterface.pause()
    } catch(error) {
        console.log(error + '\n')
        main()
    }
}

main()