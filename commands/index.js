const config = require('../config');
const { PLAYER, HELP, TOWN_HALL, TOWN_HALL_SHORT } = require('./types');
const { getCommandParameters } = require('../utility');
const player = require('./player');
const townhall = require('./townhall');

module.exports = async (whatsapp, message, clash) => {
    const { prefix, query, command, parameters } = getCommandParameters(message.body);

    if (!(prefix === config.prefix)) return;

    const helpMessage =
        `*Comandos do Bot*\n` +
        `    Prefixo: ${config.prefix}\n\n` +
        `_@ Comandos do Player:_\n` +
        `    ${config.prefix}player #TAG\n`;
        `_@ Comandos do Clã:_\n` +
        `    ${config.prefix}centrodevila #TAG`;
    
    let replyMessage = '';

    try {
        switch (command) {
            case PLAYER:
                replyMessage = await player(clash, parameters, command, config.prefix);
                break;
            case TOWN_HALL:
            case TOWN_HALL_SHORT:
                replyMessage = await townhall(clash, parameters, command, config.prefix);
                break;
            case HELP:
                replyMessage = helpMessage;
                break;
            default:
                replyMessage =
                    `Comando: _'${command}_' não existe. Veja a lista de comandos abaixo:\n\n` +
                    `${helpMessage}`;
        }

        await whatsapp.sendMessage(message.from, replyMessage);

    } catch (error) {
        await whatsapp.sendMessage(message.from, 'Algo deu errado, por favor tente novamente');
        console.log(error);
    }
}