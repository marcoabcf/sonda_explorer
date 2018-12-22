const READLINE = require('readline');
const MESSAGES = require('./messages');
const SONDA_MOVIMENTS = require('./sonda_moviments');

var number_line = 0;
var count_sondas = 0;

const rl = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: MESSAGES.DEFAULT.replace('message', MESSAGES.MESSAGE_QUANTIDADE_SONDAS)
});

rl.prompt();
rl.on('line', (line) => {
    ++number_line;
    rl.setPrompt(MESSAGES.DEFAULT.replace('message', MESSAGES.MESSAGE_QUANTIDADE_SONDAS));
    rl.prompt();

    if(number_line === count_sondas) {
        SONDA_MOVIMENTS.getMessageByLine(line.trim(), number_line);
        process.exit(0);
    }
}).on('close', () => {
    console.log('Até Logo!');
    process.exit(0);
});