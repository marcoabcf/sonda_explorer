var sondaMoviments = [
    {
        '90' : ['R', 'LLL']
    }
];

var filterMoviment = function (input, moviments) {
    return sondaMoviments.indexOf(input) > -1;
};

module.exports.getMessageByLine = function (command, line) {
    console.log(command);
    return sondaMoviments.filter(filterMoviment.bind(this, command.toString().trim()));
};
