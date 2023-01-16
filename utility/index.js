exports.getCommandParameters = (body) => {

    //* Exemplo de body: '*player COMMAND_1 TESTE_2'
    //* prefix -> '*'
    //* query -> ['player', 'COMMAND_1', 'TESTE_2']
    //* command -> 'PLAYER'
    //* parameters -> ['COMMAND_1', 'TESTE_2]

    //const prefix = body[0].toUpperCase();
    const prefix = body[0];
    const query = body.substring(1).split(' ');
    const command = query[0].toUpperCase();
    const parameters = query.slice(1);

    return {
        prefix,
        query,
        command,
        parameters
    }
};

exports.isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)